#!/bin/bash

# Called by "git push" after it has checked the remote status,
# but before anything has been pushed.  If this script exits with
# a non-zero status nothing will be pushed.
#
# This hook is called with the following parameters:
#
# $1 -- Name of the remote to which the push is being done
# $2 -- URL to which the push is being done
#
# Information about the commits which are being pushed is supplied as lines to
# the standard input in the form:
#   <local ref> <local sha1> <remote ref> <remote sha1>

# Put 'source bin/build-reminder.sh' to .git/hooks/pre-push file to run this


# Allows us to read user input below, assigns stdin to keyboard
exec < /dev/tty

read -p "Did you remember to run build script? (y/n)" ANSWER
case ${ANSWER:0:1} in
    y|Y )
        echo "Pushing to remote $1 at $2"; exit 0
    ;;
    * )
        echo "Canceled git push"; exit 1
    ;;
esac
