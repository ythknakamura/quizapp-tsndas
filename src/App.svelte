<script>
  import AnswerButton from "./AnswerButton.svelte";
  let currentScore = 0;
  let renzokuSeikai = 0;
  let quizdata = {
    mondai: "鮪", 
    seikai: "まぐろ", 
    taku: ["ひらめ", "かれい", "まぐろ", "ぶり", "くじら"]
  };

  function answerButtonClicked(isCorrect){
    if(isCorrect){
      renzokuSeikai += 1;
      currentScore += renzokuSeikai;
    }
    else{
      renzokuSeikai = 0;
    }
  }
</script>

<main class="flex flex-col h-svh">
  <!-- メニューバー -->
  <div class="bg-red-200 flex justify-around text-xl font-bold p-3">
    <div>スコア:{currentScore}</div>
    <div>連続正解数:{renzokuSeikai}</div>
  </div>
  
  <!-- 問題 -->
  <div class="bg-green-200 text-center text-4xl py-4">鮪</div>
  
  <!-- 選択肢 -->
  <div class="bg-blue-200 flex flex-col justify-around flex-grow items-center">
    {#each quizdata.taku as t}
      <AnswerButton on:click={() => answerButtonClicked(quizdata.seikai===t)}>{t}</AnswerButton>
    {/each}
  </div>
</main>