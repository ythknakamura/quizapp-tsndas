<script>
    export let currentScore = 0;
    export let renzokuSeikai = 0;

    /** 回答時のスコアの更新 */
    export function updateScore(isCorrect){
        if(isCorrect){
            renzokuSeikai += 1;
            currentScore += renzokuSeikai;
        }
        else{
            renzokuSeikai = 0;
        }
    }

    /** 終了時のスコア */
    export function getScore(){
        return currentScore;
    }
</script>

<div class="bg-red-200 flex justify-around text-xl font-bold p-3">
    <div>スコア:{currentScore}</div>
    <div>連続正解数:{renzokuSeikai}</div>
</div>