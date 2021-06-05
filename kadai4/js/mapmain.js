let map,directionsManager;

function mapsInit(position) {
  //lat=緯度、lon=経度 を取得
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
};
function mapsError(error) {
  let e = "";
  if (error.code == 1) { //1＝位置情報取得が許可されてない（ブラウザの設定）
    e = "位置情報が許可されてません";
  }
  if (error.code == 2) { //2＝現在地を特定できない
    e = "現在位置を特定できません";
  }
  if (error.code == 3) { //3＝位置情報を取得する前にタイムアウトになった場合
    e = "位置情報を取得する前にタイムアウトになりました";
  }
  alert("エラー：" + e);
};

//****************************************
//オプション設定
//****************************************
const set = {
  enableHighAccuracy: true, //より高精度な位置を求める
  maximumAge: 20000, //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
  timeout: 10000 //10秒以内に現在地情報を取得できなければ、処理を終了
};

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        center: new Microsoft.Maps.Location(35.6896, 139.7006),
        zoom: 15,
        mapTypeId: Microsoft.Maps.MapTypeId.road
    });
    
    //Load the directions module.
    Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
        //Create an instance of the directions manager.
        directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

        //Specify where to display the route instructions.
        directionsManager.setRenderOptions({itineraryContainer: '#directionsItinerary'});

        //Specify the where to display the input panel
        directionsManager.showInputPanel('directionsPanel');
        
    });
}

$(function() {
	if(localStorage.getItem('comment')) {
		$('#commnentList').html(localStorage.getItem('comment'));
	}
	$('#post').click(function(){
    for( let i=0; i<10; i++ ){}
		let name = $('<div/>').text($('#name').val()).html();
    if (name===''){
      name='名無しさん'
    }
		let main = $('<div/>').text($('#main').val()).html();
		let posts = $('#commnentList').html();
		posts = '<li>' + name + '：' + timeString(new Date()) + '<br>' + main + '</li>' + posts;
		$('#commnentList').html(posts);
		$('#name').val('');
		localStorage.setItem('comment', $('#commnentList').html());
	});
	
	$('#clear').click(function(){
		$('#commnentList').html('');
		localStorage.removeItem('comment');
	});

});