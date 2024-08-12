<script>
  import {onMount} from 'svelte';
  import AnswerButton from "./AnswerButton.svelte";
  import {getQuizdata} from "./quizdataFactory";
  import TitlePage from "./TitlePage.svelte";
  const [InitialState, TitleState, QuestionState, AnswerState, GameoverState] = [0, 1, 2, 3, 4];
  let state = InitialState;
  
  let currentScore = 0;
  let renzokuSeikai = 0;
  let quizdata;
  
  onMount(changeToTitle);

  function changeToTitle(){
    state = TitleState;
  }
  function changeToQuestion(){
    quizdata = getQuizdata();
    state = QuestionState;
  }
  function changeToAnswer(){
    state = AnswerState;
    setTimeout(changeToQuestion, 1000);
  }
  function changeToGameover(){
    state = GameoverState;
  }

  function answerButtonClicked(isCorrect){
    if(isCorrect){
      renzokuSeikai += 1;
      currentScore += renzokuSeikai;
    }
    else{
      renzokuSeikai = 0;
    }
    changeToAnswer();
  }
</script>

{#if state===TitleState}
  <TitlePage on:click={changeToQuestion}></TitlePage>
{:else if state===QuestionState || state==AnswerState}
  <main class="flex flex-col h-svh">
    <!-- メニューバー -->
    <div class="bg-red-200 flex justify-around text-xl font-bold p-3">
      <div>スコア:{currentScore}</div>
      <div>連続正解数:{renzokuSeikai}</div>
    </div>
    
    <!-- 問題 -->
    <div class="bg-green-200 text-center text-4xl py-4">{quizdata.mondai}</div>
    
    <!-- 選択肢 -->
    <div class="bg-blue-200 flex flex-col justify-around flex-grow items-center">
      {#each quizdata.taku as t}
        <AnswerButton
          isGrayout = {state===AnswerState && quizdata.seikai!==t}
          on:click={() => answerButtonClicked(quizdata.seikai===t)}>{t}
        </AnswerButton>
      {/each}
    </div>
  </main>
{/if}