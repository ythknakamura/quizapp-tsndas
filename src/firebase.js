import { initializeApp } from 'firebase/app';
import { getDatabase, get,ref, push, query, orderByChild, limitToLast} from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyCS-QpkX3eNzQXZf8_C2OFyXs5RWGRmCr0",
    databaseURL: "https://quizapp-7dab5-default-rtdb.firebaseio.com",
    projectId: "quizapp-7dab5",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let kylist = null;
async function createKylistAsync(){
    await get(ref(database, "SakanaKanji"))
        .then((snapshot)=>{
            kylist = snapshot.val();
        })
        .catch((error)=>{
            console.log(error);
        });
}

export async function fetchKanjiYomiAsync(ids){
    if(!kylist) await createKylistAsync();
    return ids.map(id => kylist[id]);
}

export async function fetchMondaisuAsync(){
    if(!kylist) await createKylistAsync();
    return kylist.length;
}

export async function fetchRankingAsync(){
    const q = query(ref(database, "Ranking"), orderByChild("score"));
    return await get(q).then((snapshot)=>{
        const data = [];
        for(const v of Object.values(snapshot.val())){
            if(v.name===null || v.name===undefined || v.name ==="" ) continue;
            data.push({score:v.score, name:v.name});
        }
        return data.toSorted(({score:s1}, {score:s2}) => s2 - s1).slice(0, 10);
    }).catch((error)=>{
        console.log(error);
    });
}

export async function insertScoreAsync(name, score){
    const time = new Date().toLocaleDateString("ja-JP");
    await push(ref(database, "Ranking"),{name, score, time})
        .catch((error)=>{
            console.log(error);
        });
}