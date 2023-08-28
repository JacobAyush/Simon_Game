/* Steps :
1. Press Any key - Start the Gamepad(Level 1); 
2. Button Flash on Level 1 and  Level Up;
3. Game ke undar ky ky press huva hai aur user ky ky press krra hai;
=> USe EventListner
4. Then user press the button and we have to check if the user is right or wrong;
5. Agar squence same huva to next level or game over;
*/

let gameSeq = [];
let userSqe = [];

// Random Buttons(Computer)
let btns = ["green","red","blue","yellow"];    // 3 index hai(one[0],two[1],three[2],four[3])

let started = false;     // Abhi Game start nhi huva
let level = 0;     // Level Start nhi huva to level 0 rahage
let h2 = document.querySelector('h2');

// There are many button as btn but there are use in there individual scope (ie. in there function scope)

// 1.   GAME STARTED

// Check krna hai user ne koye key press kiye ki nhi (keypress ek keyword hai js mai = to check koye key press huve hai ki nhi)
document.addEventListener('keypress',function(){
    if(started == false){
        console.log("Game Started");   //Agar game false hai tb he start krna hai bar bar nhi
        started = true;     //Start ke value update krdege true se ab bar bar game start nhi hoga

        levelUp();   //Game start huva hai ab level up krdo
    }
});

// 2. LEVEL UP

// Button flask hoga user aur computer dono ke liye esliye function use kiya(bar bar hora hai)
function gameFlash(btn){
    btn.classList.add('flash');   //Flash color ko add krdiya
    setTimeout(function(){        // Flash hone ke kuch time baad usse stop krdege
        btn.classList.remove('flash');
    },200);     
}

// User joo button press karega vo flash hoga
function userFlash(btn){
    btn.classList.add('userFlash');
    setTimeout(function(){
        btn.classList.remove('userFlash');
    },200)
}

// Ab koye random button flash hoga and level up hoga
function levelUp(){
    userSqe = [];     //User Sequence ko empty value set krdega(jaise he ye khali hojayega vaise he user ko starting se sb correct sequence button press krna hoga)
    // Level up krna hai aur button flask krna hai
    level++;
    h2.innerText = `Level ${level}`;   // Level Updated hogaya
    let randomIdx = Math.floor(Math.random()*3);   // Random number ko use kriya
    let randomCol = btns[randomIdx];   //Random Color choice kr liya hamne start krne ke liye
    let randomBtn = document.querySelector(`.${randomCol}`); // Button konse hai usse access krlege

    // Add krte rahege gameSeq me random color ko
    gameSeq.push(randomCol);
    console.log(gameSeq);
    // To start the game we have to choice random button
    gameFlash(randomBtn);
}

// 3. Ab user Button ko press kerega

// User ne color click kiya hai vo sahe hai ya nhi check karege(Check level krra hai)
function checkAns(idx){
    // console.log("Current Level: ",level);
    if(userSqe[idx] === gameSeq[idx]){            //game ka level hai utne he color hoge aur index hoga level-1  
        if(userSqe.length == gameSeq.length){
            setTimeout(levelUp,800);             //level ko up krdega aur dubara se random color ko update kr dega        
        }
    }   
    else{
        // We use innerHTML instead of innerText because we can't use tags in innertext
        h2.innerHTML = `Game Over! Your score was <b>${level}.</b></br>Press any key to start`;
        // Game Over hone ke baad pure body koo color red de dege
        document.querySelector('body').style.background = 'red';
        setTimeout(function(){
            document.querySelector('body').style.background = 'linear-gradient(90deg, rgba(12,238,236,1) 0%, rgba(241,34,232,1) 35%, rgba(137,91,242,1) 76%, rgba(85,244,55,1) 100%)';    //Dubara se color ko white krdega after 150ms.
        },300);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);  //Button flash krnahe hoga next level me jane ke baat bhi

    // Jb user button ko press karega
    userCol = btn.getAttribute('id');
    console.log(userCol);
    // Ab sequence me user color ko bhej dege
    userSqe.push(userCol);

    checkAns(userSqe.length-1);
};

let allBtn = document.querySelectorAll('.btn');  //Sare button access kr lege
for(btn of allBtn){
    btn.addEventListener('click',btnPress);
}

function reset(){
    started = false;   //Reset function dubara se game ko false krdega jb game over hojayega
    // Aur dubara se game sequance & user sequance khale hojayega ur level 0 hojayega
    gameSeq = [];     
    userSqe = [];
    level = 0;
}