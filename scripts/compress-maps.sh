#! /bin/bash

if [ -n "$(ls -A temp/maps)" ]; then
    for i in temp/maps/*; do
        echo $i
        if test -f "/home/luke/Projects/website/public/hotlink-ok/maps/$(basename $i)"; then
            echo "/home/luke/Projects/website/public/hotlink-ok/maps/$(basename $i) exists."
        elif [[ $i != *.jpg ]]; then
            mv $i "/home/luke/Projects/website/public/hotlink-ok/maps/$(basename $i)"
        elif [[ $i == *.jpg ]]; then
            echo /home/luke/Projects/website/temp/maps/compressed
            compress --source $i --destination temp/compressed
            infile="/home/luke/Projects/website/temp/compressed/$(basename $i)"
            file="/home/luke/Projects/website/public/hotlink-ok/maps/$(basename $i)"
            cwebp -q 60 $infile -o "${file%.jpg}.webp"
            rm $i $infile
            echo "Created ${file%.jpg}.webp"
        fi
    done
else
    echo 'No files to compress'
fi