let area=document.getElementById('area');
let cell=document.getElementsByClassName('cell');
let sername=document.getElementsByClassName('Sername');
document.getElementById('SubBut').style.pointerEvents='none';
document.getElementById('SubBut1').style.pointerEvents='none';
let GlobalCount=0;
let flasher = document.querySelector(".mig");
appCookie();
appFIOCookie();

let set=[];
for(let i=0;i<225;i++)
{
    set[i]=i+1;
}

let player="x";
let blockmove=[[],[]];
let moveblockindex=0;
let masblock=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

let winIndex=[];
let h=1;
for(let i=0;i<15;i++){
    winIndex[i]=[];
    for(let j=0;j<15;j++){
        winIndex[i][j]=h;
        h++;
    }
}

for(let i=1; i<=225; i++){
    area.innerHTML+="<div class='cell' pos="+i+"></div>";
}

for(let i=0; i < cell.length; i++){
    cell[i].addEventListener('click', cellclick, true);
}

function cellclick(){
    GlobalCount++;

    let data=[];
    
    if(!this.innerHTML){
        this.innerHTML=player;
    }
    else{
        alert("ячейка занята!");
        return;
    }

    for(i in cell){
        if(cell[i].innerHTML==player){
            data.push(parseInt(cell[i].getAttribute('pos')));
        }
    }

    if(checkWin(data)){
        area.style.pointerEvents='none';
        if(player=="o"){
            restart("Выграл: "+player,-1);
        }
        else
            restart("Выграл: "+player, 1);
    }
    else{
        let draw=true;
        for(let i in cell){
            if(cell[i].innerHTML == '') {
                draw=false;
            }
        }
        if(draw){
            area.style.pointerEvents='none';
            restart("ничья",2);
            return;
        }
    } 

    player = player == "x" ? "o" : "x";
       
    PcClick();
}

function PcClick(){
    
    let dataPlayer=[];
    for(i in cell){
        if(cell[i].innerHTML=='x'){
            dataPlayer.push(parseInt(cell[i].getAttribute('pos')));
        }
    }

    Algoritm(dataPlayer);

    let data=[];

    for(i in cell){
        if(cell[i].innerHTML==player){
            data.push(parseInt(cell[i].getAttribute('pos')));
        }
    }
    if(checkWin(data)){
        area.style.pointerEvents='none';
        if(player=="o"){
            restart("Выграл: "+player,-1);
        }
        else
            restart("Выграл: "+player, 1);
    }
    else{
        let draw=true;
        for(let i in cell){
            if(cell[i].innerHTML == '') {
                draw=false;
            }
        }
        if(draw){
            area.style.pointerEvents='none';
            restart("ничья", 2);
        }
    }

    player = player == "x" ? "o" : "x";
}

function Algoritm(data){
    
    let dxs=0, dys=0, dxf=5, dyf=5;

    let dataPC=[];
    for(i in cell){
        if(cell[i].innerHTML=='x' || cell[i].innerHTML=='o'){
            dataPC.push(parseInt(cell[i].getAttribute('pos')));
        }
    }

    while(true){
        if(dxf<=15){

            //11111111111111

            let mas=[[],[]], c=0;

            for(let i=dys;i<dyf;i++){
                let wingor=0;
                for(let j=dxs;j<dxf;j++){
                    let idgor=winIndex[i][j];
                    let indgor=data.indexOf(idgor);
                    if(!(indgor==-1)){
                        wingor++;
                        mas[0][c]=idgor;
                        mas[1][c]=wingor;
                        c++;
                    }
                    else{
                        wingor=0;
                    }
                }
            }

            let flag=0;
            for(let i=0;i<mas[0].length;i++){
                if(mas[1][i]===2 && mas[1][i+1]!=3){
                    for(let j=0;j<dataPC.length;j++){
                        if(mas[0][i]===15){
                            continue;
                        }
                        if(mas[0][i]+1!=dataPC[j]){
                            flag++;
                        }
                    }
                    if(flag===dataPC.length && masblock[0]===0){
                        //cell[mas[0][i]].innerHTML=player;//!!Горизонталь
                        blockmove[0][moveblockindex]=2;
                        blockmove[1][moveblockindex]=mas[0][i];
                        moveblockindex++;
                        masblock[0]++;
                        //return;
                    }
                    else{
                        flag=0;
                        for(let k=0; k<dataPC.length;k++){
                            if(mas[0][i]===2){
                                continue;
                            }
                            if(mas[0][i]-2!=dataPC[k]){
                                flag++;
                            }
                        }
                        if(flag===dataPC.length &&  masblock[1]===0){
                            //cell[mas[0][i]-3].innerHTML=player;//!!Горизонталь
                            blockmove[0][moveblockindex]=2;
                            blockmove[1][moveblockindex]=mas[0][i]-3;
                            moveblockindex++;
                            masblock[1]++;
                            //return;
                        }
                    }
                }
                else if(mas[1][i]===3 && mas[1][i+1]!=4){
                    flag=0;
                    for(let j=0;j<dataPC.length;j++){
                        if(mas[0][i]===15){
                            continue;
                        }
                        if(mas[0][i]+1!=dataPC[j]){
                            flag++;
                        }
                    }
                    if(flag===dataPC.length &&  masblock[2]===0){
                        //cell[mas[0][i]].innerHTML=player;//!!!Горизонталь
                        blockmove[0][moveblockindex]=3;
                        blockmove[1][moveblockindex]=mas[0][i];
                        moveblockindex++;
                        masblock[2]++;
                        //return;
                    }
                    else{
                        flag=0;
                        for(let k=0; k<dataPC.length;k++){
                            if(mas[0][i]===3){
                                continue;
                            }
                            if(mas[0][i]-3!=dataPC[k]){
                                flag++;
                            }
                        }
                        if(flag===dataPC.length &&  masblock[3]===0){
                            //cell[mas[0][i]-4].innerHTML=player;//!!!Горизонталь
                            blockmove[0][moveblockindex]=3;
                            blockmove[1][moveblockindex]=mas[0][i]-4;
                            moveblockindex++;
                            masblock[3]++;
                            //return;
                        }
                    }
                }
                else if(mas[1][i]===4){
                    flag=0;
                    for(let j=0;j<dataPC.length;j++){
                        if(mas[0][i]===15){
                            continue;
                        }
                        if(mas[0][i]+1!=dataPC[j]){
                            flag++;
                        }
                    }
                    if(flag===dataPC.length &&  masblock[4]===0){
                        //cell[mas[0][i]].innerHTML=player;//!!!!Горизонталь
                        blockmove[0][moveblockindex]=4;
                        blockmove[1][moveblockindex]=mas[0][i];
                        moveblockindex++;
                        masblock[4]++
                        //return;
                    }
                    else{
                        flag=0;
                        for(let k=0; k<dataPC.length;k++){
                            if(mas[0][i]===4){
                                continue;
                            }
                            if(mas[0][i]-4!=dataPC[k]){
                                flag++;
                            }
                        }
                        if(flag===dataPC.length &&  masblock[5]===0){
                            //cell[mas[0][i]-5].innerHTML=player;//!!!!Горизонталь
                            blockmove[0][moveblockindex]=4;
                            blockmove[1][moveblockindex]=mas[0][i]-5;
                            moveblockindex++;
                            masblock[5]++;
                            //return;
                        }
                    }
                }
            }
            
            //22222222222222

            mas=[[],[]], c=0;

            for(let i=dxs;i<dxf;i++){
                let winver=0;
                for(let j=dys;j<dyf;j++){
                    let idver=winIndex[j][i];
                    let indver=data.indexOf(idver);
                    if(!(indver==-1)){
                        winver++;
                        mas[0][c]=idver;
                        mas[1][c]=winver;
                        c++;
                    }
                    else{
                        winver=0;
                    }
                }
                    
            }

            flag=0;
            for(let i=0;i<mas[0].length;i++){
                if(mas[1][i]===2 && mas[1][i+1]!=3){
                    for(let j=0;j<dataPC.length;j++){
                        if(mas[0][i]+15>=226){
                            continue;
                        }
                        if(mas[0][i]+1*15!=dataPC[j]){
                            flag++;
                        }
                    }
                    if(flag===dataPC.length &&  masblock[6]===0){
                        //cell[mas[0][i]+1*15-1].innerHTML=player;//!!вертикаль
                        blockmove[0][moveblockindex]=2;
                        blockmove[1][moveblockindex]=mas[0][i]+1*15-1;
                        moveblockindex++;
                        masblock[6]++;
                        //return;
                    }
                    else{
                        flag=0;
                        for(let k=0; k<dataPC.length;k++){
                            if(!(mas[0][i]-2*15 > 0)){
                                continue;
                            }
                            if(mas[0][i]-2*15!=dataPC[k]){
                                flag++;
                            }
                        }
                        if(flag===dataPC.length &&  masblock[7]===0){
                            //cell[mas[0][i]-2*15-1].innerHTML=player;//!!вертикаль
                            blockmove[0][moveblockindex]=2;
                            blockmove[1][moveblockindex]=mas[0][i]-2*15-1;
                            moveblockindex++;
                            masblock[7]++;
                            //return;
                        }
                    }
                }
                else if(mas[1][i]===3 && mas[1][i+1]!=4){
                    flag=0;
                    for(let j=0;j<dataPC.length;j++){
                        if(mas[0][i]+15 >= 226){
                            continue;
                        }
                        if(mas[0][i]+1*15!=dataPC[j]){
                            flag++;
                        }
                    }
                    if(flag===dataPC.length &&  masblock[8]===0){
                        //cell[mas[0][i]+1*15-1].innerHTML=player;//!!!вертикаль
                        blockmove[0][moveblockindex]=3;
                        blockmove[1][moveblockindex]=mas[0][i]+1*15-1;
                        moveblockindex++;
                        masblock[8]++;
                        //return;
                    }
                    else{
                        flag=0;
                        for(let k=0; k<dataPC.length;k++){
                            if(!(mas[0][i]-3*15 > 0)){
                                continue;
                            }
                            if(mas[0][i]-3*15!=dataPC[k]){
                                flag++;
                            }
                        }
                        if(flag===dataPC.length &&  masblock[9]===0){
                            //cell[mas[0][i]-3*15-1].innerHTML=player;//!!!вертикаль
                            blockmove[0][moveblockindex]=3;
                            blockmove[1][moveblockindex]=mas[0][i]-3*15-1;
                            moveblockindex++;
                            masblock[9]++;
                            //return;
                        }
                    }
                }
                else if(mas[1][i]===4){
                    flag=0;
                    for(let j=0;j<dataPC.length;j++){
                        if(mas[0][i]+15>=226){
                            continue;
                        }
                        if(mas[0][i]+1*15!=dataPC[j]){
                            flag++;
                        }
                    }
                    if(flag===dataPC.length &&  masblock[10]===0){
                        //cell[mas[0][i]+1*15-1].innerHTML=player;//!!!!вертикаль
                        blockmove[0][moveblockindex]=4;
                        blockmove[1][moveblockindex]=mas[0][i]+1*15-1;
                        moveblockindex++;
                        masblock[10]++;
                        //return;
                    }
                    else{
                        flag=0;
                        for(let k=0; k<dataPC.length;k++){
                            if(!(mas[0][i]-4*15 > 0)){
                                continue;
                            }
                            if(mas[0][i]-4*15!=dataPC[k]){
                                flag++;
                            }
                        }
                        if(flag===dataPC.length &&  masblock[11]===0){
                            //cell[mas[0][i]-5*15].innerHTML=player;//!!!!вертикаль
                            blockmove[0][moveblockindex]=4;
                            blockmove[1][moveblockindex]=mas[0][i]-4*15-1;
                            moveblockindex++;
                            masblock[11]++;
                            //return;
                        }
                    }
                }
            }

            //3333333333

            mas=[[],[]], c=0;

            let wingor1=0;
            let tempi=dys;
            for(let i=dxs;i<dxf;i++){
                let idgor1=winIndex[tempi][i];
                let indgor1=data.indexOf(idgor1);
                if(!(indgor1==-1)){
                    wingor1++;
                    mas[0][c]=idgor1;
                    mas[1][c]=wingor1;
                    c++;
                }
                else{
                    wingor1=0;
                }
                tempi++;
            }

            flag=0;
            for(let i=0;i<mas[0].length;i++){
                if(mas[1][i]===2 && mas[1][i+1]!=3){
                    for(let j=0;j<dataPC.length;j++){
                        if(mas[0][i]===15 || mas[0][i]+16 >= 226){
                            continue;
                        }
                        if(mas[0][i]+1*16!=dataPC[j]){
                            flag++;
                        }
                    }
                    if(flag===dataPC.length &&  masblock[12]===0){
                        //cell[mas[0][i]+1*16-1].innerHTML=player;//!!диагональ
                        blockmove[0][moveblockindex]=2;
                        blockmove[1][moveblockindex]=mas[0][i]+1*16-1;
                        moveblockindex++;
                        masblock[12]++;
                        //return;
                    }
                    else{
                        flag=0;
                        for(let k=0; k<dataPC.length;k++){
                            if(mas[0][i]===1*16+1 && !(mas[0][i]-2*16 > 0)){
                                continue;
                            }
                            if(mas[0][i]-2*16!=dataPC[k]){
                                flag++;
                            }
                        }
                        if(flag===dataPC.length && masblock[13]===0){
                            //cell[mas[0][i]-2*16-1].innerHTML=player;//!!диагональ
                            blockmove[0][moveblockindex]=2;
                            blockmove[1][moveblockindex]=mas[0][i]-2*16-1;
                            moveblockindex++;
                            masblock[13]++;
                            //return;
                        }
                    }
                }
                else if(mas[1][i]===3 && mas[1][i+1]!=4){
                    flag=0;
                    for(let j=0;j<dataPC.length;j++){
                        if(mas[0][i]===15 || mas[0][i]+16 >= 226){
                            continue;
                        }
                        if(mas[0][i]+1*16!=dataPC[j]){
                            flag++;
                        }
                    }
                    if(flag===dataPC.length&& masblock[14]===0){
                        //cell[mas[0][i]+1*16-1].innerHTML=player;//!!!диагональ
                        blockmove[0][moveblockindex]=3;
                        blockmove[1][moveblockindex]=mas[0][i]+1*16-1;
                        moveblockindex++;
                        masblock[14]++;
                        //return;
                    }
                    else{
                        flag=0;
                        for(let k=0; k<dataPC.length;k++){
                            if(mas[0][i]===1*16+1 && !(mas[0][i]-2*16 > 0)){
                                continue;
                            }
                            if(mas[0][i]-3*16!=dataPC[k]){
                                flag++;
                            }
                        }
                        if(flag===dataPC.length && mas[0][i]-4*16 > 0 &&  masblock[15]===0){
                            //cell[mas[0][i]-4*16].innerHTML=player;//!!!диагональ
                            blockmove[0][moveblockindex]=3;
                            blockmove[1][moveblockindex]=mas[0][i]-4*16;
                            moveblockindex++;
                            masblock[15]++;
                            //return;
                        }
                    }
                }
                else if(mas[1][i]===4){
                    flag=0;
                    for(let j=0;j<dataPC.length;j++){
                        if(mas[0][i]===15 || mas[0][i]+16 >= 226){
                            continue;
                        }
                        if(mas[0][i]+1*16!=dataPC[j]){
                            flag++;
                        }
                    }
                    if(flag===dataPC.length &&  masblock[16]===0){
                        //cell[mas[0][i]+1*16-1].innerHTML=player;//!!!!диагональ
                        blockmove[0][moveblockindex]=4;
                        blockmove[1][moveblockindex]=mas[0][i]+1*16-1;
                        moveblockindex++;
                        masblock[16]++;
                        //return;
                    }
                    else{
                        flag=0;
                        for(let k=0; k<dataPC.length;k++){
                            if(mas[0][i]===1*16+1 && !(mas[0][i]-2*16 > 0)){
                                continue;
                            }
                            if(mas[0][i]-4*16!=dataPC[k]){
                                flag++;
                            }
                        }
                        if(flag===dataPC.length &&  masblock[17]===0){
                            //cell[mas[0][i]-4*16].innerHTML=player;//!!!!диагональ
                            blockmove[0][moveblockindex]=4;
                            blockmove[1][moveblockindex]=mas[0][i]-4*16-1;
                            moveblockindex++;
                            masblock[17]++;
                            //return;
                        }
                    }
                }
            }

            //4444444444

            mas=[[],[]], c=0;

            let wingorob1=0;
            let tempi11=dys;
            for(let i=dxf-1;i>=dxs;i--){
                let idgorob=winIndex[tempi11][i];
                let indgorob=data.indexOf(idgorob);
                if(!(indgorob==-1)){
                    wingorob1++;
                    mas[0][c]=idgorob;
                    mas[1][c]=wingorob1;
                    c++;
                }
                else{
                    wingorob1=0;
                }
                tempi11++;
            }

            flag=0;
            for(let i=0;i<mas[0].length;i++){
                if(mas[1][i]===2 && mas[1][i+1]!=3){
                    for(let j=0;j<dataPC.length;j++){
                        if(mas[0][i]===2 || mas[0][i]+14 >= 226){
                            continue;
                        }
                        if(mas[0][i]+1*14!=dataPC[j]){
                            flag++;
                        }
                    }
                    if(flag===dataPC.length && masblock[18]===0){
                        //cell[mas[0][i]+1*14-1].innerHTML=player;//!!обдиагональ
                        blockmove[0][moveblockindex]=2;
                        blockmove[1][moveblockindex]=mas[0][i]+1*14-1;
                        moveblockindex++;
                        masblock[18]++;
                        //return;
                    }
                    else{
                        flag=0;
                        for(let k=0; k<dataPC.length;k++){
                            if(mas[0][i]===1*14+1 && !(mas[0][i]-2*14 > 0)){
                                continue;
                            }
                            if(mas[0][i]-2*14!=dataPC[k]){
                                flag++;
                            }
                        }
                        if(flag===dataPC.length && mas[0][i]-2*14 > 0 && masblock[19]===0){
                            //cell[mas[0][i]-2*14-1].innerHTML=player;//!!обдиагональ
                            blockmove[0][moveblockindex]=2;
                            blockmove[1][moveblockindex]=mas[0][i]-2*14-1;
                            moveblockindex++;
                            masblock[19]++;
                            //return;
                        }
                    }
                }
                else if(mas[1][i]===3 && mas[1][i+1]!=4){
                    flag=0;
                    for(let j=0;j<dataPC.length;j++){
                        if(mas[0][i]===13 || mas[0][i]+14 >= 226){
                            continue;
                        }
                        if(mas[0][i]+1*14!=dataPC[j]){
                            flag++;
                        }
                    }
                    if(flag===dataPC.length && masblock[20]===0){
                        //cell[mas[0][i]+1*14-1].innerHTML=player;//!!!обдиагональ
                        blockmove[0][moveblockindex]=3;
                        blockmove[1][moveblockindex]=mas[0][i]+1*14-1;
                        moveblockindex++;
                        masblock[20]++;
                        //return;
                    }
                    else{
                        flag=0;
                        for(let k=0; k<dataPC.length;k++){
                            if(mas[0][i]===1*14+1 && !(mas[0][i]-2*14 > 0)){
                                continue;
                            }
                            if(mas[0][i]-3*14!=dataPC[k]){
                                flag++;
                            }
                        }
                        if(flag===dataPC.length && masblock[21]===0){
                            //cell[mas[0][i]-3*14-1].innerHTML=player;//!!!обдиагональ
                            blockmove[0][moveblockindex]=3;
                            blockmove[1][moveblockindex]=mas[0][i]-3*14-1;
                            moveblockindex++;
                            masblock[21]++;
                            //return;
                        }
                    }
                }
                else if(mas[1][i]===4){
                    flag=0;
                    for(let j=0;j<dataPC.length;j++){
                        if(mas[0][i]===13 || mas[0][i]+14 >= 226){
                            continue;
                        }
                        if(mas[0][i]+1*14!=dataPC[j]){
                            flag++;
                        }
                    }
                    if(flag===dataPC.length && masblock[22]===0){
                        //cell[mas[0][i]+1*14-1].innerHTML=player;//!!!!обдиагональ
                        blockmove[0][moveblockindex]=4;
                        blockmove[1][moveblockindex]=mas[0][i]+1*14-1;
                        moveblockindex++;
                        masblock[22]++;
                        //return;
                    }
                    else{
                        flag=0;
                        for(let k=0; k<dataPC.length;k++){
                            if(mas[0][i]===1*14+1 && !(mas[0][i]-2*14 > 0)){
                                continue;
                            }
                            if(mas[0][i]-4*14!=dataPC[k]){
                                flag++;
                            }
                        }
                        if(flag===dataPC.length && masblock[23]===0){
                            //cell[mas[0][i]-4*14].innerHTML=player;//!!!!обдиагональ
                            blockmove[0][moveblockindex]=4;
                            blockmove[1][moveblockindex]=mas[0][i]-4*14-1;
                            moveblockindex++;
                            masblock[23]++;
                            //return;
                        }
                    }
                }
            }

            dxf++;dxs++;
        }
        else if(dyf<15){
            dyf++;dys++;
            dxf=5;dxs=0;
        }
        else if(Blocking(blockmove)) {
            return;
        }
        else {
            Movezero();
            return;
        }
    }
}

let hod_O_one=0;

function Movezero(){
    let datahod_X=[];
    for(i in cell){
        if(cell[i].innerHTML=='x'){
            datahod_X.push(parseInt(cell[i].getAttribute('pos')));
        }
    }
    if(datahod_X.length===1){
        if(datahod_X[0]<211){
            cell[datahod_X[0]+14].innerHTML=player;
            hod_O_one=datahod_X[0]+14;
            return;
        }
        else{
            cell[datahod_X[0]-16].innerHTML=player;
            hod_O_one=datahod_X[0]-16;
            return;
        }
    }
    else{
        if(cell[ hod_O_one + 1].innerHTML!='o' && cell[hod_O_one+1].innerHTML!='x'){
            for(let i=14;i<=224;i+=15){
                if(hod_O_one<i){
                    cell[hod_O_one+1].innerHTML=player;
                    hod_O_one++;
                    return;
                }
                else if(hod_O_one==i){
                    if(cell[ hod_O_one-1].innerHTML!='o' && cell[hod_O_one-1].innerHTML!='x')
                    {
                        for(let i=0;i<=210;i+=15){
                            if(hod_O_one>i){
                                cell[hod_O_one-1].innerHTML=player;
                                hod_O_one--;
                                return;
                            } 
                        }
                    }
                }
            }    
        }
        else if(cell[ hod_O_one-1].innerHTML!='o' && cell[hod_O_one-1].innerHTML!='x')
        {
            for(let i=0;i<=210;i+=15){
                if(hod_O_one>i){
                    cell[hod_O_one-1].innerHTML=player;
                    hod_O_one--;
                    return;
                } 
            }
        }
        else if(cell[ hod_O_one-2].innerHTML!='o'&& cell[ hod_O_one-2].innerHTML!='x')
        {
            for(let i=0;i<=210;i+=15){
                if(hod_O_one>i){
                    cell[hod_O_one-2].innerHTML=player;
                    hod_O_one-=2;
                    return;
                } 
            } 
        }
        else if(cell[ hod_O_one-3].innerHTML!='o'&& cell[ hod_O_one-3].innerHTML!='x')
        {
            for(let i=0;i<=210;i+=15){
                if(hod_O_one>i){
                    cell[hod_O_one-3].innerHTML=player;
                    hod_O_one-=3;
                    return;
                } 
            } 
        }
        else if(cell[ hod_O_one-4].innerHTML!='o'&& cell[ hod_O_one-4].innerHTML!='x')
        {
            for(let i=0;i<=210;i+=15){
                if(hod_O_one>i){
                    cell[hod_O_one-4].innerHTML=player;
                    hod_O_one-=4;
                    return;
                } 
            } 
        }
        else{
            let dataPC=[];
            for(i in cell){
                if(cell[i].innerHTML=='x' || cell[i].innerHTML=='o'){
                    dataPC.push(parseInt(cell[i].getAttribute('pos')));
                }
            }
            let settwo=new Set(dataPC);
            let finishset=new Set([...set].filter(x=>!settwo.has(x)));
            let rand=Math.floor(Math.random()*finishset.size);
            cell[Array.from(finishset)[rand]-1].innerHTML=player;
            hod_O_one=Array.from(finishset)[rand]-1;
        }
    }
}

function Blocking(masarr) {
    for(let i=0; i<masarr[0].length;i++) {
        if(masarr[0][i]===4) {
            cell[masarr[1][i]].innerHTML=player;
            blockmove=[[],[]];
            moveblockindex=0;
            masblock=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            return true;
        }
    }
    for(let i=0; i<masarr[0].length;i++) {
        if(masarr[0][i]===3) {
            cell[masarr[1][i]].innerHTML=player;
            blockmove=[[],[]];
            moveblockindex=0;
            masblock=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            return true;
        }
    }
    for(let i=0; i<masarr[0].length;i++) {
        if(masarr[0][i]===2) {
            cell[masarr[1][i]].innerHTML=player;
            blockmove=[[],[]];
            moveblockindex=0;
            masblock=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            return true;
        }
    }
    return false;
}

function checkWin(data){
    
    let dxs=0, dys=0, dxf=5, dyf=5;
    while(true){
        if(dxf<=15){
            for(let i=dys;i<dyf;i++){
                let wingor=0;
                let tempgor=0;
                for(let j=dxs;j<dxf;j++){
                    let idgor=winIndex[i][j];
                    let indgor=data.indexOf(idgor);
                    if(!(indgor==-1)){
                        wingor++;
                        tempgor=wingor;
                        if(tempgor==5){
                            return true;
                        }
                    }
                    else{
                        wingor=0;
                    }
                }
            }

            for(let i=dys;i<dyf;i++){
                let winver=0;
                let tempver=0;
                for(let j=dxs;j<dxf;j++){
                    let idver=winIndex[j][i];
                    let indver=data.indexOf(idver);
                    if(!(indver==-1)){
                        winver++;
                        tempver=winver;
                        if(tempver==5){
                            return true;
                        }
                    }
                    else{
                        winver=0;
                    }
                }
                
            }

            let wingor1=0;
            let tempgor1=0;
            let tempi=dys;
            for(let i=dxs;i<dxf;i++){
                let idgor1=winIndex[tempi][i];
                let indgor1=data.indexOf(idgor1);
                if(!(indgor1==-1)){
                    wingor1++;
                    tempgor1=wingor1;
                    if(tempgor1==5){
                        return true;
                    }
                }
                else{
                    wingor1=0;
                }
                tempi++;
            }

            let wingorob1=0;
            let tempgorob1=0;
            let tempi11=dys;
            for(let i=dxf-1;i>=dxs;i--){
                let idgorob=winIndex[tempi11][i];
                let indgorob=data.indexOf(idgorob);
                if(!(indgorob==-1)){
                    wingorob1++;
                    tempgorob1=wingorob1;
                    if(tempgorob1==5){
                        return true;
                    }
                }
                else{
                    wingorob1=0;
                }
                tempi11++;
            }

            dxf++;dxs++;
        }
        else if(dyf<15){
            dyf++;dys++;
            dxf=5;dxs=0;
        }
        else {
            return false;
        }
    }
}

function NewGame()
{
    for(let i=0; i<cell.length; i++){
        cell[i].innerHTML='';
    }
    area.style.pointerEvents='';
    GlobalCount=0;
    document.getElementById('SubBut').style.pointerEvents='none';
    document.getElementById('SubBut1').style.pointerEvents='none';
    document.getElementById('SubBut1').value="";
}

function restart(text, index){
    alert(text);
    if(index==1){
        alert('Введите Фамилию и Имя в поле!');
        migpole();
        document.getElementById('SubBut').style.pointerEvents='';
        document.getElementById('SubBut1').style.pointerEvents='';
    }
}

function Save() {
    while(true) {
        if(document.getElementById('SubBut1').value != "" && document.getElementById('SubBut1').value != " ") {
            break;
        }
        else {
            alert("Вы ничего не ввели!");
            migpole();
            document.getElementById('SubBut1').value="";
            return;
        }
    }
    accountVerification();
    document.getElementById('SubBut').style.pointerEvents='none';
    document.getElementById('SubBut1').style.pointerEvents='none';
    document.getElementById('SubBut1').value="";
}

function accountVerification()
{
    let mas=[];
    for(let i=1;i<sername.length;i+=2) {
        if(GlobalCount < sername[i].innerHTML){
            if(i==1) {
                mas[0]=document.getElementById('SubBut1').value;
                mas[1]=GlobalCount;
                for(let k=0,l=2; k<sername.length-2; k++,l++) {
                    mas[l]=sername[k].innerHTML;
                }
            }
            else {
                for(let j=0; j < i-1; j++) {
                    mas[j]=sername[j].innerHTML;
                }
                mas[i-1]=document.getElementById('SubBut1').value;
                mas[i]=GlobalCount;
                for(let o=i+1;o<sername.length;o++) {
                    mas[o]=sername[o-2].innerHTML;
                }
            }
            returnFIO(mas);
            return;
        }
        else if(GlobalCount == sername[i].innerHTML) {
            if(i==1) {
                mas[0]=document.getElementById('SubBut1').value;
                mas[1]=GlobalCount;
                for(let k=2,l=2; k<sername.length; k++,l++) {
                    mas[l]=sername[k].innerHTML;
                }
            }
            else {
                for(let j=0; j < i-1; j++) {
                    mas[j]=sername[j].innerHTML;
                }
                mas[i-1]=document.getElementById('SubBut1').value;
                mas[i]=GlobalCount;
                for(let o=i+1;o<sername.length;o++) {
                    mas[o]=sername[o].innerHTML;
                }
            }
            returnFIO(mas);
            return;
        }
    }
}

function returnFIO(mas) {
    for(let i=0;i<sername.length;i++) {
        sername[i].innerHTML=mas[i];
    }
    delFIOCookie();
    for(let j=0;j<sername.length;j+=2) {
        document.cookie=sername[j].innerHTML+'='+sername[j+1].innerHTML;
    }
}

function appFIOCookie() {
    let masCookie=document.cookie.split("; ");
    let i=0;
    for(let j=0;j<sername.length;j+=2) {
        let masarrCookie=masCookie[i].split("=");
        sername[j].innerHTML=masarrCookie[0];
        sername[j+1].innerHTML=masarrCookie[1];
        i++;
    }
}

function delFIOCookie() {
    let masCookie=document.cookie.split("; ");
    for(let i=0;i<masCookie.length;i++) {
        document.cookie=masCookie[i]+"; max-age=-1";
    }
}

function appCookie(){
    for(let j=0;j<10;j++) {
        let str="Фамилия_"+(j+1)+"=225";
        document.cookie = str;
    }
}

function migpole() {
    let my_set_interval_id=setInterval(() => {
        flasher.style.backgroundColor =
          flasher.style.backgroundColor == "red" ? "white" : "red";
    }, 200);
    setTimeout(()=>{clearInterval(my_set_interval_id)},500);
}