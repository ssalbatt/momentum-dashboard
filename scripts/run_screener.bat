@echo off
REM MomentumSys - 월간 자동 스크리닝
REM 매월 1일 자동 실행 (Windows 작업 스케줄러)

set PYTHON=C:\Users\laser\AppData\Local\Python\pythoncore-3.14-64\python.exe
set SCRIPT=C:\Users\laser\Desktop\trade-dashboard\scripts\momentum_screener.py
set LOG=C:\Users\laser\Desktop\momentum-dashboard\scripts\screener.log

echo [%date% %time%] 스크리닝 시작 >> "%LOG%"
"%PYTHON%" "%SCRIPT%" >> "%LOG%" 2>&1
echo [%date% %time%] 스크리닝 완료 >> "%LOG%"
