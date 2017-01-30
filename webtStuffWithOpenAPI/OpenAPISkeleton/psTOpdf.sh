x = $1
sed -e "/mark currentfile eexec/,/cleartomark/ d" $x > $x
ps2pdf $x