<?php
  if  ($_GET['url']) {
    $file_name = strip_tags($_GET['url']);
  }
  // $file_name = 'http://www.picturesnew.com/media/images/image-background.jpg';
  $image = file_get_contents($file_name);
  $imagedata = base64_encode($image);
  echo $imagedata;
  echo '<img alt="Base64 Image" src="data:image/png;base64,'.$imagedata.'" />';
?>