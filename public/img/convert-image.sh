#!/bin/bash

DIR="500x"

for i in $(find ./ \( -name "*.jpg" -or -name "*.png" -or -name "*.gif" \) | grep -v ./$DIR ); do
  file="./$DIR${i##.}"

  echo "Convertendo arquivo -> $file"
  mkdir -p $(dirname $file)
  gm convert "$i" -quality 70 -geometry 500x500 $file
done;