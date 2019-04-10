module.exports = function(...numbers) {
	var group = getGroup(numbers);
  	var opt = ["+","-","*","/"];
  	for(g=0;g<group.length;g++){
      for(i=0;i<4;i++){
        for(j=0;j<4;j++){
          for(k=0;k<4;k++){
				var a=group[g][0];
            	var b=group[g][1];
            		c=group[g][2];
            		d=group[g][3];
            var res = compute(a,b,c,d,opt[i],opt[j],opt[k]);
            if(!res){
              continue;
            }
            return res;
          }
        }
      }
      
    }

    return null;
}


 function compute(a,b,c,d,o1,o2,o3){
    //第一种[(ab)c]d
    var r1 = operate(o1,a,b);
    var r2 = operate(o2,r1,c);
    if(operate(o3,r2,d) == 24){
      return "'"+"[("+a+o1+b+")"+o2+c+"]"+d+"'";
    }
    
    //第二种[a(bc)]d
    r1 = operate(o1,b,c);
    r2 = operate(o2,r1,a);
    if(operate(o3,r2,d) == 24){
      return "'"+"["+a+o2+"("+b+o1+c+")]"+"o3"+d+"'";
    }
    
    //第三种a[(bc)d]
    r1 = operate(o1,b,c);
    r2 = operate(o2,r1,d);
    if(operate(o3,r2,a) == 24){
      return "'"+a+o3+"[("+b+o1+c+")"+o2+d+"]'";
    }
    
    //第四种a[b(cd)]
    r1 = operate(o1,c,d);
    r2 = operate(o2,r1,b);
    if(operate(o3,r2,a) == 24){
      return "'"+a+o3+"["+b+o2+"("+c+o1+d+")]'"
    }
    
    //第五种(ab)(cd)
    r1 = operate(o1,a,b);
    r2 = operate(o2,c,d);
    if(operate(o3,r1,r2) == 24){
      return "'("+a+o1+b+")"+o3+"("+c+o2+d+")'"
    }
    
    return null;
  }
    
//将4个数进行排列组合，找出所有的可能性
function getGroup(num){
  var group = [];
  var repeat = "";
  for(i1=0;i1<4;i1++){
    for(i2=0;i2<4;i2++){
			for(i3=0;i3<4;i3++){
        for(i4=0;i4<4;i4++){
					if ((i1 == i2) || (i2 == i3) || (i3 ==i4) || (i4 == i1) ||(i1 == i3) ||(i2 == i4)) continue;
          var str = ""+num[i1]+num[i2]+num[i3]+num[i4];
          //去掉重复的数组
          if(repeat.indexOf(str) > -1){
            //console.log("repeated");
            continue;
          } 
          repeat += str + ",";
          group.push([num[i1], num[i2], num[i3], num[i4]]);
        }
      }
    }
  }
  return group;
}

//简单运算函数
function operate(f,m,n) {
	switch(f){
    case "+":
      return m+n;
      break;
    case "-":
      return m-n;
    case "*":
      return m*n;
    case "/":
      return m/n;
  }
}