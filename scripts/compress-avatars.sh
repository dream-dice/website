if [ -n "$(ls -A temp/avatars)" ]; then
    for i in temp/*; do
        if test -f "/home/luke/Projects/website/public/hotlink-ok/avatars/$(basename $i)"; then
            echo "/home/luke/Projects/website/public/hotlink-ok/avatars/$(basename $i) exists."
        else
            compress --source $i --destination /home/luke/Projects/website/public/hotlink-ok/avatars
            rm $i
        fi
    done
else
    echo 'No files to compress'
fi
