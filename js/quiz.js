export class Quiz
{
    constructor(questionArray)
    {       
        this.questionArray = questionArray;
        this.total = this.questionArray.length;
        this.nextBtn = document.getElementById("next")
        this.nextBtn.addEventListener("click" , this.nextQ.bind(this) );
        this.tryBtn = document.getElementById("tryBtn").addEventListener("click" , this.tyAgain)
        this.current = 0;
        this.score =0;
        this.isCorrect='';
        this.showQ()
    }
    showQ()
    {
        document.getElementById("question").innerHTML = this.questionArray[this.current].question;
        document.getElementById("currentQuestion").innerHTML=  this.current+1;
        document.getElementById("totalNumOfQ").innerHTML = this.total;
        this.showA()
    
    }
    showA()
    {
        this.answers = [this.questionArray[this.current].correct_answer , 
        ...this.questionArray[this.current].incorrect_answers] ;
       

        let currentIndex = this.answers.length,  randomIndex;

        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
            [this.answers[currentIndex], this.answers[randomIndex]] = [
            this.answers[randomIndex], this.answers[currentIndex]];
        }
      
        this.package=``
        for( let i =0 ; i < this.answers.length ; i++)
        {
            this.package +=`
            <div class="form-check">
            <input type="radio" value="${this.answers[i]}" class="form-check-input" name="answer" id=${i}>
            ${this.answers[i]}
        </div>
            `
        }
        document.getElementById("AnsRow").innerHTML = this.package;
       
      
    }
    nextQ()
    {
        
        this.checkA();
        
        if (this.isCorrect) 
        {    
            $("#correct").fadeIn(500 , ()=>
            {
                $("#correct").fadeOut(500)
            })
        } 
        else
        {
            $("#inCorrect").fadeIn(500 , ()=>
            {
                $("#inCorrect").fadeOut(500)
            })
        }
        


        this.current++;
        if(this.current < this.total)
        {
            this.showQ()

        }
        else{
            this.finish()
        }
    }
    checkA()
    { 
        this.userAnswer = document.getElementsByName("answer");
        var userAnswerArr=[...this.userAnswer];
        var answer = userAnswerArr.filter((el) => el.checked===true)[0].value;
        this.correctAnswer = this.questionArray[this.current].correct_answer;
        if(answer ==  this.correctAnswer)
        {
            this.score++;
            this.isCorrect=true;

        }
        else
        {
            this.isCorrect=false;
        }
    }
    finish()
    {
        $("#quiz").fadeOut(500 , ()=>
        {
            $("#finish").fadeIn(500)
        })
        document.getElementById("score").innerHTML = this.score;
    }
    tyAgain()
    {
        $("#finish").fadeOut(500 , ()=>
        {
            $("#setting").fadeIn(500)
        })
    }
}



