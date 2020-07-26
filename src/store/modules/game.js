const state = {
    grid: [],
    difficulty: 'easy',
    rowNumber: 8,
    colNumber: 10,
    bombNumber: 10,
    cellRemaining: 18,
    bombRemaining: 10,
    gameStatus: 'uninitialised',
    smiley: 'happy',
    cellIndexPressed: null,
    gridSize () {
        return this.colNumber * this.rowNumber
    }
}

const getters = {
    grid: state => state.grid,
    difficulty: state => state.difficulty,
    gameStatus: state => state.gameStatus,
    rowNumber: state => state.rowNumber,
    colNumber: state => state.colNumber,
}

const actions = {
    fetchGrid({ commit }){
        if (state.gameStatus === 'uninitialised') {
            let grid = createTheGrid(state.gridSize())
            commit('updateCellRemaining', state.gridSize())
            commit('updateGrid', grid)
            commit('updateGameStatus', 'initialised')
        } else if (state.gameStatus === 'began') {
            // todo update the timer
            commit()
        }
    },
    clickOnCell({ commit }, cellClickedIndex ) {
        let grid = state.grid
        let cellRemaining = state.cellRemaining
        if (state.gameStatus === 'initialised') {
            grid = fillTheGrid(state.grid, cellClickedIndex)
            commit('updateGameStatus', 'began')
        }
        if (state.gameStatus === 'began' || state.gameStatus === 'initialised') {
            if (!grid[cellClickedIndex].isOpen) {
                let results = openCell(grid, cellClickedIndex, cellRemaining)
                if (results.loose) {
                    commit('updateGameStatus', 'loose')
                }
                if (results.cellRemaining === 0) {
                    commit('updateGameStatus', 'won')
                }
                commit('updateCellRemaining', results.cellRemaining)
                commit('updateGrid', results.grid)

            } else if (getNumberNeighboursBombs(grid, cellClickedIndex) > 0
                        && getNumberNeighboursBombs(grid, cellClickedIndex) === getNumberNeighboursFlag(grid, cellClickedIndex)) {
                let results = openNeighbours(grid, cellClickedIndex, cellRemaining)
                if (results.loose) {
                    commit('updateGameStatus', 'loose')
                }
                if (results.cellRemaining === 0) {
                    commit('updateGameStatus', 'won')
                }
                commit('updateCellRemaining', results.cellRemaining)
                commit('updateGrid', results.grid)
            }
        }
    },
    rightClickOnCell ({ commit }, cellClickedIndex) {
        // right click is use to put flag or
        if ( state.gameStatus === 'began' && !state.grid[cellClickedIndex].isOpen) {
            let grid = state.grid
            grid[cellClickedIndex].hasFlag = !grid[cellClickedIndex].hasFlag
            if (state.grid[cellClickedIndex].hasFlag) {
                commit('updateBombRemaining', state.bombRemaining - 1)
            } else {
                commit('updateBombRemaining', state.bombRemaining + 1)
            }
            commit('updateGrid', grid)
        }
    },
    mouseDown ({ commit }, cellIndex) {
        if (!state.grid[cellIndex].isOpen && state.cellIndexPressed === null) {
            let grid = state.grid
            grid[cellIndex].pressed = true
            commit('updateGrid', grid)
            commit('updateSmiley', 'surprised')
            commit('updateCellIndexPressed', cellIndex)
        }
    },
    mouseLeave ({ commit }, cellIndex) {
        if (state.cellIndexPressed !== null) {
            let grid = state.grid
            grid[cellIndex].pressed = false
            commit('updateGrid', grid)
            commit('updateCellIndexPressed', null)
            if (state.gameStatus === 'began'){
                commit('updateSmiley', 'happy')
            } else if (state.gameStatus === 'won') {
                commit('updateSmiley', 'cool')
            } else if (state.gameStatus === 'loose') {
                commit('updateSmiley', 'dead')
            } else {
                commit('updateSmiley', 'happy')
            }
        }
    },
    changeDifficulty({ commit }, difficulty){
        let rowNumber, colNumber, bombNumber
        if (difficulty === 'easy') {
            rowNumber = 8
            colNumber = 10
            bombNumber = 10
        } else if (difficulty === 'intermediate') {
            rowNumber = 8
            colNumber = 10
            bombNumber = 10
        } else {
            rowNumber = 8
            colNumber = 10
            bombNumber = 10
        }
        let grid = createTheGrid(rowNumber * colNumber)
        commit('updateCellRemaining', rowNumber * colNumber)
        commit('updateGrid', grid)
        commit('updateDifficulty', rowNumber, colNumber, bombNumber)
    },

}

const mutations = {
    updateGrid: (state, grid) => state.grid = grid,
    updateDifficulty: (state, rowNumber, colNumber, bombNumber) => {
        state.rowNumber = rowNumber
        state.colNumber = colNumber
        state.bombNumber = bombNumber
        state.bombRemaining = bombNumber
    },
    updateGameStatus: (state, gameStatus) => state.gameStatus = gameStatus,
    updateCellRemaining: (state, cellRemaining) => state.cellRemaining = cellRemaining,
    updateBombRemaining: (state, bombRemaining) => state.bombRemaining = bombRemaining,
    updateSmiley: (state, smiley) => state.smiley = smiley,
    updateCellIndexPressed: (state, cellPressed) => state.cellIndexPressed = cellPressed
}

export default {
    state,
    getters,
    actions,
    mutations
}


function createTheGrid(gridSize) {
    let grid = []
    for (let i = 0; i < gridSize; i += 1) {
        grid.push({
            index: i,
            hasBomb: false,
            isOpen: false,
            hasFlag: false,
            bombNb: 0,
            pressed: false
        })
    }
    return grid
}

function fillTheGrid(grid, firstClickCellIndex) {
    let cell
    do {
        grid = createTheGrid(state.gridSize())
        let i = 0
        while (i < state.bombNumber) {
            const rand = Math.floor(Math.random() * state.gridSize())
            if (!grid[rand].hasBomb && (rand !== i) && !isInNeighborhood(rand, firstClickCellIndex)) {
                grid[rand].hasBomb = true
                i++
            }
        }
        cell = grid[firstClickCellIndex]
    }while (cell.hasBomb)
    return grid
}

function isInNeighborhood (i1, i2) {
    return ((i1 === i2 + 1) || // i1 is at left of i2
        (i1 === i2 - 1) || // i1 is at right of i2
        (i1 === i2 + state.colNumber) || // i1 is above  i2
        (i1 === i2 - state.colNumber) || // i1 is below  i2
        (i1 === i2 + state.colNumber + 1) || // diagonals down left
        (i1 === i2 + state.colNumber - 1) || // diagonals down right
        (i1 === i2 - state.colNumber + 1) || // diagonals up left
        (i1 === i2 - state.colNumber - 1)) // diagonals up right
}


function getNeighboursIndex (index) {
    let neighbours = []
    for (let x = -1; x < 2; x += 1) {
        for (let y = -1; y < 2; y += 1) {
            const cellIndex = index + x + (y *state.colNumber)
            let isInLeftBorder = index % state.colNumber === 0
            let isInRightBorder = index % state.colNumber === state.colNumber - 1
            if ((cellIndex !== index) && (cellIndex >= 0) && (cellIndex < state.gridSize()) && !(isInLeftBorder && x === -1) && !(isInRightBorder && x === 1)) {
                neighbours.push(cellIndex)
            }
        }
    }
    return neighbours
}

function getNumberNeighboursBombs (grid, index) {
    let nbBombs = 0
    let neighbours = getNeighboursIndex(index)
    for (let i = 0; i < neighbours.length; i++) {
        if (grid[neighbours[i]].hasBomb) {
            nbBombs++
        }
    }
    return nbBombs
}

function getNumberNeighboursFlag (grid, index) {
    let nbFlags = 0
    let neighbours = getNeighboursIndex(index)
    for (let i = 0; i < neighbours.length; i++) {
        if (grid[neighbours[i]].hasFlag) {
            nbFlags++
        }
    }
    return nbFlags
}

function openCell(grid, cellClickedIndex, cellRemaining) {
    if (grid[cellClickedIndex].hasFlag || grid[cellClickedIndex].isOpen) {
        return {grid: grid, cellRemaining: cellRemaining, loose: false}
    }
    grid[cellClickedIndex].isOpen = true
    // if (cellClicked.pressed) {
    //     cellClicked.pressed = false
    // }
    if (grid[cellClickedIndex].hasBomb) {

        return {grid: grid, cellRemaining: cellRemaining, loose: true}

    } else {
        grid[cellClickedIndex].bombNb = getNumberNeighboursBombs(grid, cellClickedIndex)
        cellRemaining--
        if (grid[cellClickedIndex].bombNb === 0) {
            let results = openNeighbours(grid, cellClickedIndex, cellRemaining)
            grid = results.grid
            cellRemaining = results.cellRemaining
            if (results.loose) {
                return {grid: grid, cellRemaining: cellRemaining, loose: true}
            }
        }
    }
    return {grid: grid, cellRemaining: cellRemaining, loose: false}
}

function openNeighbours(grid, cellClickedIndex, cellRemaining) {
    let neighbours = getNeighboursIndex(cellClickedIndex)
    for (let i = 0; i < neighbours.length; i++) {
        if (!grid[neighbours[i]].isOpen) {
            let results = openCell(grid, neighbours[i], cellRemaining)
            grid = results.grid
            cellRemaining = results.cellRemaining
            if (results.loose) {
                return {grid: grid, cellRemaining: cellRemaining, loose: true}
            }

        }
    }
    return {grid: grid, cellRemaining: cellRemaining, loose: false}
}
