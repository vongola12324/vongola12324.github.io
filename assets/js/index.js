
randomAvatar();

function randomAvatar () {
  const dir = "assets/img/avatars/Avatar";
  const amount = 13;
  const choice = Math.floor((Math.random() * amount+1));
  $('#avatar').attr('src', dir+('0'+choice).slice(-2)+'.jpg');
}