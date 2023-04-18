#! /bin/bash

if [ -n "$(ls -A temp/maps)" ]; then
    for i in temp/maps/*; do
        if test -f "/home/luke/Projects/website/public/hotlink-ok/maps/$(basename $i)"; then
            echo "/home/luke/Projects/website/public/hotlink-ok/maps/$(basename $i) exists."
        elif [[ $i != *.jpg ]]; then
            mv $i "/home/luke/Projects/website/public/hotlink-ok/maps/$(basename $i)"
        elif [[ $i == *.jpg ]]; then
            file="/home/luke/Projects/website/public/hotlink-ok/maps/$(basename $i)"
            compress --source $i --destination temp/maps/compressed
            infile="/home/luke/Projects/website/temp/maps/compressed/$(basename $i)"
            cwebp -q 60 $infile -o "${file%.jpg}.webp"
            mv "${file%.jpg}.webp" /home/luke/Projects/website/public/hotlink-ok/maps/${file%.jpg}.webp"
            rm $i $infile "${file%.jpg}.webp"
        fi
    done
else
    echo 'No files to compress'
fi
