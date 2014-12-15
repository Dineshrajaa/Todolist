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
            if (titl!==" "&&description!==" ") {
                var db=window.openDatabase("ToDo",1.0,"ToDo",5242880);
                db.transaction(function(tx){
                    tx.executeSql("insert into todotable(title,desc,schedule_date,schedule_time) values(?,?,?,?)",[titl,description,sch_date,sch_time]);
                     //alert("Inserted Succ");
                     /*
                   tx.executeSql("select * from todotable",[],function(tx,results){
            alert("I have got an call");            
            var maxID=results.rows.length;
            alert(maxID);
            var contents=results.rows.item(maxID);
            var notit=contents.title;
            alert(notit);
            var nodesc=contents.desc;
            var nodate=contents.schedule_date;            
            var notime=contents.schedule_time;
            var notificationTime=new Date(nodate+" "+notime);
            alert(notificationTime);
            document.addEventListener('deviceready',function(){
                window.plugin.notification.local.add({
                    id:maxID,
                    title:notit,
                    message:nodesc,
                    repeat:weekly,
                    date:notificationTime
                });
            },false);
                   }); 
                    alert("Inserted Successfully");   */              
                                     });
                addAlert();
                            }
            else alert("Enter all the data");            
        }   

       

        //Function to Add Local Notification
        function addAlert(){
            var db=window.openDatabase("ToDo",1.0,"ToDo",5242880);
            db.transaction(function(tx){
                tx.executeSql("select * from todotable",[],function(tx,results){
            //alert("I have got an call");            
            var maxID=results.rows.length-1;
            //alert("No. Of Rows "+ maxID);
            var contents=results.rows.item(maxID);
            var notid=contents.todoid;
            var notit=contents.title;
            //alert(notit);            
            var nodesc=contents.desc;
            //alert(nodesc);
            var nodate=contents.schedule_date;
            //alert(nodate);            
            var notime=contents.schedule_time;
            //alert(notime);
            var notificationTime=new Date(nodate+" "+notime);
            //alert(notificationTime);
            document.addEventListener('deviceready',function(){
                alert("About to add Notification "+notid);
                window.plugin.notification.local.add({
                    id:notid,
                    title:notit,
                    message:nodesc,
                    date:notificationTime
                });
            },false);
                   }); 
            });
             
                //alert("Added Notification");            
            
        } 
        //Function to Display Todo's in Listview
        function showToDo(transaction,results){
            alert(results.rows.length);
            for(var i=0;i<results.rows.length;i++){
                var row=results.rows.item(i);
                $("#todolist").append("<li id="+row.todoid+"><a href='#'>"+row.title+"</a><a href='#' id='deleter' data-rel='dialog' data-transition='slideup'>Remove</a></li>");                
            }

                $("#todolist").listview("refresh");
                
        }
        //Function to read Todo's from DB
        function readToDo(){
            var db=window.openDatabase("ToDo",1.0,"ToDo",5242880);
            console.log("DB Opened");
            db.transaction(function(tx){
                tx.executeSql("select * from todotable",[],showToDo);
            });
        }

        function fullyLoaded(){
            alert("I am Fully Loaded");
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