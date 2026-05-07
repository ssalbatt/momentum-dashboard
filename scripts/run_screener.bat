@echo off
REM MomentumSys - 월간 자동 스크리닝 + GitHub 자동 push
REM 매월 1일 자동 실행 (Windows 작업 스케줄러)

set PYTHON=C:\Users\laser\AppData\Local\Python\pythoncore-3.14-64\python.exe
set SCRIPT=C:\Users\laser\Desktop\trade-dashboard\scripts\momentum_screener.py
set SITE=C:\Users\laser\Desktop\momentum-dashboard
set LOG=%SITE%\scripts\screener.log

echo [%date% %time%] 스크리닝 시작 >> "%LOG%"
"%PYTHON%" "%SCRIPT%" >> "%LOG%" 2>&1

if %errorlevel% equ 0 (
    echo [%date% %time%] 스크리닝 완료 - GitHub push 시작 >> "%LOG%"
    cd /d "%SITE%"
    git add data\momentum_latest.json
    git commit -m "data: monthly screener update %date%"
    git push origin main >> "%LOG%" 2>&1
    echo [%date% %time%] GitHub push 완료 >> "%LOG%"
) else (
    echo [%date% %time%] 스크리닝 실패 - push 건너뜀 >> "%LOG%"
)
