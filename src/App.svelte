<script>
  import AnswerButton from "./AnswerButton.svelte";
  let currentScore = 0;
  let renzokuSeikai = 0;

  function answerButtonClicked(){
    renzokuSeikai += 1;
    currentScore += renzokuSeikai;
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
    <AnswerButton on:click={answerButtonClicked}>ひらめ</AnswerButton>
    <AnswerButton on:click={answerButtonClicked}>かれい</AnswerButton>
    <AnswerButton on:click={answerButtonClicked}>まぐろ</AnswerButton>
    <AnswerButton on:click={answerButtonClicked}>ぶり</AnswerButton>
    <AnswerButton on:click={answerButtonClicked}>くじら</AnswerButton>
  </div>
</main>