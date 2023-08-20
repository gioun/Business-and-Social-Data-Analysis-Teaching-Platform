loadXMLDoc()
{
    var xmlhttp;
    var _this = this;//这个很关键,否则直接使用this.JsonString=xxxx会寄
    // 传入UID变量，与API组合成对应的url,
    var uidurl=this.Api+this.Id;
    console.log(uidurl);
    console.log(typeof(uidurl));
    if (window.XMLHttpRequest)
    {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            console.log("进入if");
            console.log(xmlhttp.readyState);
            console.log(xmlhttp.responseText);
            console.log(typeof(xmlhttp.responseText));
            // document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
            // ParseJson(xmlhttp.responseText);
            
            _this.JsonString= xmlhttp.responseText;
            _this.ParseJson();

        }
        else
        {
            console.log(xmlhttp.readyState);
            console.log("---------------");
            console.log(this.JsonString);
            console.log("---------------");
        }
    }
    xmlhttp.open("GET",uidurl,true);
    xmlhttp.send();
}