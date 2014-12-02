function addToDo(){
            var titl=$("#todotitle").val();
            var description=$("#tododesc").val();
            var sch_date=$("#tododate").val();
            var sch_time=$("#todotime").val();
            if (titl!==""&&description!=="") {
                var db=window.openDatabase("ToDo",1.0,"ToDo",5242880);
                db.transaction(function(tx){

                    tx.executeSql("insert into todotable(title,desc,schedule_date,schedule_time) values(?,?,?,?)",[titl,description,sch_date,sch_time]);
                    //alert("Inserted Successfully");
                });
            }
            else alert("Enter all the data");
        }
        //Function to Display Todo's in Listview
        function showToDo(transaction,results){
            for(var i=0;i<results.rows.length;i++){
                var row=results.rows.item(i);
                $("#todolist").append("<li>"+row.title+"</li>");                
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