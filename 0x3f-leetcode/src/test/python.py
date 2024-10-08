
        
from collections import  *
from functools import  *
from itertools import  *
from typing import *
from heapq import *
from bisect import *
# from sortedcontainers  import *
inf = float('inf')

ma = lambda x,y : x if x > y else y
mi = lambda x,y : x if x < y else y
        
class Solution:
    def minRefuelStops(self, target: int, startFuel: int, stations: List[List[int]]) -> int:
        stations.sort(key=lambda x : x[0])
        s = d = 0
        s += startFuel
        n = len(stations)
        for i in range(n):
            dx,ful = stations[i]
            if target >= d and dx - s < 0:
                pass
        print(s,d)
        if s < d:
            return -1
        return 0

        
sol = Solution()
target = 1
startFuel = 1
stations = []
# expect = 0
print(sol.minRefuelStops(target,startFuel,stations))
sol = Solution()
target = 100
startFuel = 1
stations = [[10,100]]
# expect = -1
print(sol.minRefuelStops(target,startFuel,stations))
sol = Solution()
target = 100
startFuel = 10
stations = [[10,60],[20,30],[30,30],[60,40]]
# expect = 2
print(sol.minRefuelStops(target,startFuel,stations))
        