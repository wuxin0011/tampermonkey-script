#### 方法一：并查集

为了得到数组 nums 中的每个数和哪些数属于同一个组件，需要得到数组 nums 中的最大值 m，对于每个不超过 m 的正整数 num 计算 num 和哪些数属于同一个组件。对于范围 \[2,num​\] 内的每个正整数 i，如果 i 是 num 的因数，则 num 和 i、inum​ 都属于同一个组件。

可以使用并查集实现组件的计算。初始时，每个数分别属于不同的组件。如果两个正整数满足其中一个正整数是另一个正整数的因数，则这两个正整数属于同一个组件，将这两个正整数的组件合并。

当所有不超过 m 的正整数都完成合并操作之后。遍历数组 nums，对于每个数得到其所在的组件并更新该组件的大小，遍历结束之后即可得到最大组件的大小。


```py

    class UnionFind:
        def __init__(self, n: int):
            self.parent = list(range(n))
            self.rank = [0] * n
    
        def find(self, x: int) -> int:
            if self.parent[x] != x:
                self.parent[x] = self.find(self.parent[x])
            return self.parent[x]
    
        def merge(self, x: int, y: int) -> None:
            x, y = self.find(x), self.find(y)
            if x == y:
                return
            if self.rank[x] > self.rank[y]:
                self.parent[y] = x
            elif self.rank[x] < self.rank[y]:
                self.parent[x] = y
            else:
                self.parent[y] = x
                self.rank[x] += 1
    
    class Solution:
        def largestComponentSize(self, nums: List[int]) -> int:
            uf = UnionFind(max(nums) + 1)
            for num in nums:
                i = 2
                while i * i <= num:
                    if num % i == 0:
                        uf.merge(num, i)
                        uf.merge(num, num // i)
                    i += 1
            return max(Counter(uf.find(num) for num in nums).values())
```
**复杂度分析**

*   时间复杂度：O(n×α(n)×m​)，其中 n 是数组 nums 的长度，m 是数组 nums 中的最大元素，α 是反阿克曼函数。这里的并查集使用了路径压缩和按秩合并，单次操作的时间复杂度是 O(α(n))，对于每个元素需要遍历 O(m​) 个数字寻找公因数并执行合并操作，总操作次数是 O(n×m​)，因此整个数组的并查集操作的时间复杂度是 O(n×α(n)×m​)，并查集操作之后需要 O(n×α(n)) 的时间再次遍历数组计算最大组件大小，因此总时间复杂度是 O(n×α(n)×m​)。
    
*   空间复杂度：O(m)，其中 m 是数组 nums 中的最大元素。并查集和统计组件大小都需要 O(m) 的空间。