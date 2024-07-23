#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky:debug $*"
  }
  readonly hook_name="$(basename "$0")"
  readonly git_params="$*"
  debug "husky v$(npx husky --version)"
  debug "current working directory: $(pwd)"
  debug "git params: $git_params"
  if [ -f ~/.huskyrc ]; then
    debug "sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi
  export husky_skip_init=1
  sh -e "$0" "$@"
  exitCode="$?"
  if [ $exitCode != 0 ]; then
    echo "husky - $hook_name hook exited with code $exitCode (error)"
  fi
  exit $exitCode
fi
unset husky_skip_init