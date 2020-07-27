<template>
    <div class="welcome">
        <div class="pageWelcome">
            <div class="header-welcome">
                <h1 class="title">Welcome</h1>
                <p class="paragraph">
                    This page is about a remake of the famous Minesweeper game.
                </p>
                <div class="button">
                    <b-button class="button" variant="outline-primary" to="/game">Start Playing</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WelcomePage"
    }
</script>

<style scoped>
    .pageWelcome {
        color: #888;
        display: table;
        font-family: sans-serif;
        height: 100%;
        text-align: center;
        width: 100%;
        margin-top: 10vh;
    }

    .title {
        color: #555;
        font-size: 2em;
        font-weight: 400;
    }

    .paragraph {
        margin: 0 auto;
        width: 280px;
    }

    .button {
        margin-top: 5vh;
    }

    @media only screen and (max-width: 280px) {

        .pageWelcome,
        p {
            width: 95%;
        }

        .title {
            font-size: 1.5em;
            margin: 0 0 0.3em;
        }

    }

</style>
