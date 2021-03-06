function addToDo(){
            //alert("I am clicked");
            var titl=$("#todotitle").val();
            var description=$("#tododesc").val();
            var sch_date=$("#tododate").val();
            var sch_time=$("#todotime").val();
            var alertTime=new Date(sch_date+" "+sch_time);
            /*document.addEventListener('deviceready',function(){
                    alert("Device is Ready");
                    window.plugin.notification.local.add({
                        id:      1,
                        title:   titl,
                        message: descr,
                        repeat:  'weekly',
                        date:    alertTime})
                },false); */
           // alert(alertTime);
            if (titl!==""&&description!=="") {
                var db=window.openDatabase("ToDo",1.0,"ToDo",5242880);
                db.transaction(function(tx){

                    tx.executeSql("insert into todotable(title,desc,schedule_date,schedule_time) values(?,?,?,?)",[titl,description,sch_date,sch_time]);
                    alert("Inserted Successfully");                   //var toid;
                                     });              
                addAlert(titl,description,alertTime);


                            }
            else alert("Enter all the data");
            
        }
        //Function to Add Local Notification
        function addAlert(titl,description,alertTime){
             document.addEventListener('deviceready',function(){
                window.plugin.notification.local.add({
                        id:      Math.floor((Math.random() * 1000) + 1),
                        title:   titl,
                        message: description,
                        repeat:  'weekly',                      
                        date:    alertTime
                });
                alert("Added Notification");
            
            },false);
        }
        //Function to Display Todo's in Listview
        function showToDo(transaction,results){
            for(var i=0;i<results.rows.length;i++){
                var row=results.rows.item(i);
                $("#todolist").append("<li id="+row.todoid+"><a href='#'>"+row.title+"</a><a href='#' id='deleter' data-rel='dialog' data-transition='slideup' id='remove'>Remove</a></li>");                
            }

                $("#todolist").listview("refresh");
                
        }
        //Function to read Todo's from DB
        function readToDo(){
            var db=window.openDatabase("ToDo",1.0,"ToDo",5242880);
            //$("#todolist").html("");
            db.transaction(function(tx){
                tx.executeSql("select * from todotable",[],showToDo);

            });
        }

        function fullyLoaded(){
            //alert("I am Fully Loaded");
            if (window.openDatabase) {
                var db=window.openDatabase("ToDo",1.0,"ToDo",5242880);
                db.transaction(function(tx){
                    //tx.executeSql("drop table todotable");
                    tx.executeSql("create table if not exists todotable(todoid integer primary key asc,title text,desc text,schedule_date text,schedule_time text)");
                    //alert("Table Created");
                    readToDo();
                });
            }
            else{
                alert("Your Device donot support offline storage");
            }
            
        }

        