    const todoForm =document.querySelector('#todo-form');
    const todoList =document.querySelector('.todos');
    const mainInput =document.querySelector('#todo-form input');
    const totalTasks =document.querySelector('#counter');
    const btnGroup =document.querySelectorAll('.btn-group button');
    const check =document.querySelector('.check');
    const lis =document.querySelectorAll('li');
    
    let tasks =JSON.parse(localStorage.getItem('tasks')) || []  

    if(localStorage.getItem('tasks')){
        tasks.map((task)=>{
            createTask(task);
        })
    }

    todoForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const inputVal =mainInput.value;
        if(inputVal ==''){
            return
        }
        const task ={
            id :new Date().getTime(),
            name :inputVal,
            isCompleted:false
        }
        tasks.push(task);
        localStorage.setItem('tasks',JSON.stringify(tasks));

        createTask(task);
        todoForm.reset();
        mainInput.focus();
    })

    todoList.addEventListener('click',(e)=>{
        if(e.target.classList.contains('fa-remove') || 
        e.target.parentElement.classList.contains('remove-task')){
            const taskId =e.target.closest('li').id;
            removeTask(taskId);
        }
    })

    todoList.addEventListener('dbclick',(e)=>{
        const taskId =e.target.closest('li').id
        console.log(e)
       /*  updateTask(taskId,e.target); */
    })

    todoList.addEventListener('keydown',(e)=>{
        if(e.keyCode == 13){
            e.preventDefault();
            e.target.blur();
        }
    })

    check.addEventListener('click',check);

    btnGroup.forEach(btn=>{
        btn.addEventListener('click',()=>{
            document.querySelector('button.active').classList.remove('active')
            btn.classList.add("active");
            filters(btn.id);
        })
    })

    function filters(id){
        switch(id){
            case "all":
                document.querySelectorAll('li').forEach(function(el){
                    el.style.display ='flex';
                })
            break;
            case "completed":
                document.querySelectorAll('li').forEach(function(el){
                   if(el.classList.contains('complete')){
                    el.style.display ='flex';
                   }else{
                    el.style.display ='none';
                   }
                })
                break;
                case "active":
                document.querySelectorAll('li').forEach(function(el){
                    if(el.classList.contains('complete')){
                        el.style.display ='none';
                    }else{
                        el.style.display='flex';
                    }
                })
        }
    }

    function createTask(task){
        const taskEl =document.createElement('li');
        taskEl.setAttribute('id',task.id);
        if(task.isCompleted){
            taskEl.classList.add('complete')
        }
        const taskElMarkup =`
        <div>
            <input type="checkbox" name="tasks" id="${task.id}" ${task.isCompleted ?'checked' : ''}>
            <span ${!task.isCompleted ? 'contenteditable' : ''}>${task.name}</span>
            <input value="${task.name}" type="text" style="display:none" data-id="${task.id}">
        </div>
        <button class="remove-task" title="Remove the "${task.name}" task"><i class="fa fa-remove" style="font-size:24px;color:red"></i></button>
        `
        taskEl.innerHTML =taskElMarkup
        todoList.appendChild(taskEl);
        countTasks();   
    }

    function countTasks(){
        const totalTasksArray =tasks.filter((task)=>task.isCompleted != true)
        totalTasks.textContent =totalTasksArray.length +" items left";
        const checkUncheck =document.querySelector('#checkUncheck');
        if(totalTasksArray.length==0){
            checkUncheck.textContent="Uncheck All";
        }else{
            checkUncheck.textContent="Check All";
        }
    }

    function removeTask(taskId){
        tasks =tasks.filter((task)=>task.id != parseInt(taskId))
        localStorage.setItem('tasks',JSON.stringify(tasks))
        document.getElementById(taskId).remove();
        countTasks();
    }

    function updateTask(taskId,el){
        const task =tasks.find((task)=>task.id ==parseInt(taskId))
        if(el.hasAttribute('contenteditable')){
            task.name =el.textContent;
        }else{
            const span =el.nextElementSibling;
            const parent =el.closest('li');

            task.isCompleted = !task.isCompleted
            if(task.isCompleted){
                span.removeAttribute('contenteditable');
                parent.classList.add('complete')
            }else{
                span.setAttribute('contenteditable','true')
                parent.classList.remove('complete')
            }
        }
        localStorage.setItem('tasks',JSON.stringify(tasks))
        countTasks()
    }

    function clearCompleted(){
        tasks.filter((task)=>{
            if(task.isCompleted ==true){
                document.getElementById(task.id).remove();
            } 
        })
        tasks =tasks.filter((task)=>task.isCompleted !=true)
        localStorage.setItem('tasks',JSON.stringify(tasks))
        countTasks();
    }

    function checkAll(e){
        const lis=document.querySelectorAll('li');
        const inputs=document.querySelectorAll('li input');  
            if(e.innerHTML=="Check All"){
                tasks.forEach(function(task){
                    task.isCompleted =true;
                    console.log(task)
               })
                inputs.forEach(function(inp){
                    inp.setAttribute('checked',true);
                })
                localStorage.setItem('tasks',JSON.stringify(tasks))
                countTasks()
                e.innerHTML ="Uncheck All"
                location.reload();
            }else{
                tasks.forEach(function(task){
                    task.isCompleted=false;
                    console.log(task)
                })
                inputs.forEach(function(inp){
                    inp.removeAttribute('checked');
                })
                localStorage.setItem('tasks',JSON.stringify(tasks))
                countTasks()
                e.innerHTML ="Check All"
                location.reload();
            }
   }