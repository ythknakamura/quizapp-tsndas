<script>
  import {onMount} from 'svelte';
  import {getQuizdata} from "./quizdataFactory";
  import AnswerButton from "./AnswerButton.svelte";
  import TitlePage from "./TitlePage.svelte";
  import Progressbar from './Progressbar.svelte';
  import GameoverModal from './GameoverModal.svelte';
  import FancyScore from './FancyScore.svelte';
  
  let gameoverModal;
  let fancyScore;
  
  const [InitialState, TitleState, QuestionState, AnswerState, GameoverState, QuizStart] = [0, 1, 2, 3, 4, 5];
  let state = InitialState;
  let currentScore = 0;
  let renzokuSeikai = 0;
  const maxTime = 5;
  let time = 60;
  let quizdata;
  
  onMount(changeToTitle);

  function changeToTitle(){
    gameoverModal.close();
    state = TitleState;
  }

  function changeToQuestion(){
    quizdata = getQuizdata();
    state = QuestionState;
  }

  function changeToAnswer(){
    state = AnswerState;
    setTimeout(()=>{
      if(state===AnswerState){
        changeToQuestion();
      }
    }, 1000);
  }

  function changeToGameover(){
    state = GameoverState;
    gameoverModal.showModal();
  }

  function changeToQuizstart(){
    state = QuizStart;
    time = maxTime;
    const timer = setInterval(()=>{
      if(state===QuestionState && time<0){
        clearInterval(timer);
        changeToGameover();
      }
      time -= 0.1;
    }, 100);
    changeToQuestion();
  }

  function answerButtonClicked(isCorrect){
    if(state!==QuestionState) return;
    fancyScore.updateScore(isCorrect);
    changeToAnswer();
  }
</script>

{#if state===TitleState}
  <TitlePage on:click={changeToQuizstart}></TitlePage>
{:else if state===QuestionState || state===AnswerState || state===GameoverState}
  <main class="flex flex-col h-svh">
    <!-- メニューバー -->
    <FancyScore bind:this={fancyScore}/>

    <!--プログレスバー-->
    <Progressbar {maxTime} {time}/>
    
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

<GameoverModal currentScore={fancyScore?.getScore()} bind:modal={gameoverModal} on:click={changeToTitle}/>