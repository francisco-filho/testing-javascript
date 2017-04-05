#!/bin/bash

DIR="500x"

for i in $(find ./ \( -name "*.jpg" -or -name "*.png" -or -name "*.gif" \) | grep -v ./$DIR ); do
  echo "find $i"
  mkdir -p $(dirname "./$DIR${i##.}")
  gm convert "$i" -quality 70 -geometry 500x500 "./$DIR${i##.}"
done;