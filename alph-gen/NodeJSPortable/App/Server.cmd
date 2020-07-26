@echo off

title NodeJS

cls
echo.
echo Node
node --version
echo.
set action=%1
set post=%2
%1
%2
cmd /k
