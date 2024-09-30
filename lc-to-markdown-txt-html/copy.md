![image.png](https://pic.leetcode-cn.com/ee740d492676a26ff7017dd1635ff3af0361ee412f0e1c7bf2ffee032e3dfb4e-image.png)

**概述**：

这道题是很经典「动态规划」算法问题。

*   需要对「子序列」和「子串」这两个概念进行区分；
    *   子序列（subsequence）：子序列并不要求连续，例如：序列 `[4, 6, 5]` 是 `[1, 2, 4, 3, 7, 6, 5]` 的一个子序列；
    *   子串（substring、subarray）：子串一定是原始字符串的连续子串。
*   题目中的「上升」的意思是「严格上升」。反例： `[1, 2, 2, 3]` 不能算作「上升子序列」；
*   子序列中元素的 **相对顺序** 很重要，子序列中的元素 **必须保持在原始数组中的相对顺序**。如果把这个限制去掉，将原始数组去重以后，元素的个数即为所求；
*   O(NlogN) 的解法根据了「最长上升子序列」问题的特点，**设计了合适的状态**，使得复杂度从 O(N2) 降到了 O(NlogN)。

* * *

### 方法一：暴力解法

使用「回溯搜索算法」或者「位运算」的技巧，可以得到输入数组的所有子序列，时间复杂度为 O(2N)。再对这些子串再依次判定是否为「严格上升」，时间复杂度 为O(N)，所以总的时间复杂度为：O(N⋅2N)。

> 如果题目只问最优解，而没有问具体解，可以考虑使用动态规划，而不应该使用回溯算法（暴力搜索）搜索所有具体解。

* * *

方法二：动态规划
--------

首先考虑题目问什么，就把什么定义成状态。题目问最长上升子序列的长度，其实可以把「子序列的长度」定义成状态，但是发现「状态转移」不好做。

基于「动态规划」的状态设计需要满足「无后效性」的设计思想，可以将状态定义为「以 `nums[i]` 结尾 的「上升子序列」的长度」。

> 「无后效性」的设计思想：让不确定的因素确定下来，以保证求解的过程形成一个逻辑上的有向无环图。这题不确定的因素是某个元素是否被选中，而我们设计状态的时候，让 `nums[i]` 必需被选中，这一点是「让不确定的因素确定下来」，也是我们这样设计状态的原因。

**1\. 定义状态**：

`dp[i]` 表示：**以 `nums[i]` 结尾** 的「上升子序列」的长度。注意：这个定义中 **`nums[i]` 必须被选取，且必须是这个子序列的最后一个元素**；

**2\. 状态转移方程**：

如果一个较大的数接在较小的数后面，就会形成一个更长的子序列。只要 `nums[i]` 严格大于在它位置之前的某个数，那么 `nums[i]` 就可以接在这个数后面形成一个更长的上升子序列。

dp\[i\]\=0≤j<i,nums\[j\]<nums\[i\]max​dp\[j\]+1

**3\. 初始化**：

`dp[i] = 1`，1 个字符显然是长度为 1 的上升子序列。

**4\. 输出**：  
不能返回最后一个状态值，最后一个状态值只表示以 `nums[len - 1]` 结尾的「上升子序列」的长度，状态数组 `dp` 的最大值才是题目要求的结果。

1≤i≤Nmax​dp\[i\]

**5\. 空间优化**：

遍历到一个新数的时候，之前所有的状态值都得保留，因此无法优化空间。

* * *

可以看下面的例子理解「动态规划」的执行流程。由于幻灯片上的文字比较多，可以先让幻灯片动起来，从整体把握思想。

![](https://pic.leetcode-cn.com/9681bb5aa5712f0ca6bb577ca0d21df805f72f6b3b5b95c3d5340801118d5683-300-dp-1.png)![](https://pic.leetcode-cn.com/158c37377e1e3efbb0cba7858187a9d66428ef991c5f05c59e3a7dab6b509436-300-dp-2.png)![](https://pic.leetcode-cn.com/92d5014ce051b31aff242f10c7d9735e6e3b6e35f567e9a2663ce04075390d3d-300-dp-3.png)![](https://pic.leetcode-cn.com/30739cd98770a4ca9e02a78971a23b5d1030d0b5135223cc419045a2dabdaecb-300-dp-4.png)![](https://pic.leetcode-cn.com/a9d0dd0c2e1292d466f86f7fa980bf854bc9a0be0f90720a7d9823ba532becf9-300-dp-5.png)![](https://pic.leetcode-cn.com/1615882048-rutMlD-image.png)![](https://pic.leetcode-cn.com/a495f476c50e8dbbc20b76cec1e97454e060b9fbfae4a12e205b87ea75ae0bdc-300-dp-7.png)![](https://pic.leetcode-cn.com/2ca152b9864efd08d1c3d030f2544d794ac6d26deff3bfd451c8fd0d67f88799-300-dp-8.png)![](https://pic.leetcode-cn.com/53e09c8ad0fb0c8d9fa1954222228b834ad5cbdb531e2efc06230b574873a122-300-dp-9.png)![](https://pic.leetcode-cn.com/fe7d46471345771c83c5675fb3deb07efea784d206e964befea4b5413eea3392-300-dp-10.png)

1 / 10

**参考代码 1**：

Java

    import java.util.Arrays;
    
    public class Solution {
    
        public int lengthOfLIS(int[] nums) {
            int len = nums.length;
            if (len < 2) {
                return len;
            }
    
            int[] dp = new int[len];
            Arrays.fill(dp, 1);
    
            for (int i = 1; i < len; i++) {
                for (int j = 0; j < i; j++) {
                    if (nums[j] < nums[i]) {
                        dp[i] = Math.max(dp[i], dp[j] + 1);
                    }
                }
            }
    
            int res = 0;
            for (int i = 0; i < len; i++) {
                res = Math.max(res, dp[i]);
            }
            return res;
        }
    }

**复杂度分析：**

*   时间复杂度：O(N2)，这里 N 是数组的长度，我们写了两个 `for` 循环，每个 `for` 循环的时间复杂度都是线性的；
*   空间复杂度：O(N)，要使用和输入数组长度相等的状态数组，因此空间复杂度是 O(N)。

「动态规划」的方法在计算一个新的状态的时候，需要考虑到之前所有小于 `nums[i]` 的那些位置的状态。事实上还有改进的空间：首先修改「状态」的定义。

* * *

方法三：修改状态定义（同时用到了贪心算法、二分查找）
--------------------------

**状态设计思想**：依然着眼于某个上升子序列的 **结尾的元素**，如果 **已经得到的上升子序列的结尾的数越小，那么遍历的时候后面接上一个数，会有更大的可能构成一个长度更长的上升子序列**。既然结尾越小越好，我们可以记录 **在长度固定的情况下，结尾最小的那个元素的数值**，这样定义以后容易得到「状态转移方程」。

为了与「方法二」的状态定义区分，将状态数组命名为 `tail`。

**1 .定义新状态（特别重要）**

`tail[i]` 表示：长度为 `i + 1` 的 **所有** 上升子序列的结尾的最小值。

**说明**：

*   **数组 `tail` 不是问题中的「最长上升子序列」**（下文还会强调），不能命名为 `LIS`。数组 `tail` 只是用于求解 `LIS` 问题的状态数组；
*   `tail[0]` 表示长度为 1 的所有上升子序列中，结尾最小的元素的数值。以题目中的示例为例 `[10, 9, 2, 5, 3, 7, 101, 18]` 中，容易发现长度为 `2` 的**所有**上升子序列中，结尾最小的是子序列 `[2, 3]` ，因此 `tail[1] = 3`；
*   下标和长度有数值为 `1` 的偏差；

状态定义其实也描述了状态转移方程。

**2\. 状态转移方程**：

从直觉上看，数组 `tail` 也是一个严格上升数组。下面是证明。

* * *

**证明**：即对于任意的下标 `0 <= i < j < len` ，都有 `tail[i] < tail[j]`。

使用反证法：假设对于任意的下标 `i` < `j` ，存在某个 `tail[i] >= tail[j]`。

对于此处的 `tail[i]` 而言，对应一个上升子序列 \[a0​,a1​,...,ai​\]，依据定义 tail\[i\]\=ai​；  
对于此处的 `tail[j]` 而言，对应一个上升子序列 \[b0​,b1​,...,bi​,...,bj​\]，依据定义 tail\[j\]\=bj​；

由于 `tail[i] >= tail[j]`，等价于 ai​≥bj​。而在上升子序列 \[b0​,b1​,...,bi​,...,bj​\] 中，bi​ 严格小于 bj​，故有 ai​≥bj​\>bi​，则上升子序列 \[b0​,b1​,...,bi​\] 是一个长度也为 `i + 1` 但是结尾更小的数组，与 ai​ 的最小性矛盾。

因此原命题成立。（证完）

* * *

因为只需要维护状态数组 `tail` 的定义，它的长度就是最长上升子序列的长度。下面说明在遍历中，如何维护状态数组 `tail` 的定义。

1.  在遍历数组 `nums` 的过程中，看到一个新数 `num`，如果这个数 **严格** 大于有序数组 `tail` 的最后一个元素，就把 `num` 放在有序数组 `tail` 的后面，否则进入第 2 点；

> 注意：这里的大于是「严格大于」，不包括等于的情况。

2.  在有序数组 `tail` 中查找第 1 个等于大于 `num` 的那个数，试图让它变小；

*   如果有序数组 `tail` 中存在 **等于** `num` 的元素，什么都不做，因为以 `num` 结尾的最短的「上升子序列」已经存在；
*   如果有序数组 `tail` 中存在 **大于** `num` 的元素，找到第 1 个，让它变小，这样我们就找到了一个 **结尾更小**的**相同长度**的上升子序列。

**说明**：

*   我们再看一下数组 `tail[i]` 的定义：长度为 `i + 1` 的 **所有** 最长上升子序列的结尾的最小值。因此，在遍历的过程中，我们试图让一个大的值变小是合理的；
*   这一步可以认为是「贪心算法」，总是做出在当前看来最好的选择，当前「最好的选择」是：当前只让让第 1 个严格大于 `nums[i]` 的数变小，变成 `nums[i]`，这一步操作是「无后效性」的；
*   由于是在有序数组中的操作，因此可以使用「二分查找算法」。

**3\. 初始化**：

遍历第 1 个数 `nums[0]`，直接放在有序数组 `tail` 的开头 `tail[0] = nums[0]`。

**4\. 输出**：

有序数组 `tail` 的长度，就是所求的「最长上升子序列」的长度。

**5\. 空间优化**：

无法优化空间。

下图演示了算法在示例上的的执行流程，在示例的数组后面加上了 `4`、`8`、`6`、`12`。依然是先让幻灯片动起来，看思想就好了。

![](https://pic.leetcode-cn.com/ecfe05bf65309a085484489b9dbf0d354ebd04254aa192ae08712dfe02dc2a0c-300-greed-binary-search-1.png)![](https://pic.leetcode-cn.com/f30cf9c7fee1577ea3cdab964198aabfd64e566801e7a2f671be1209fdbe93b7-300-greed-binary-search-2.png)![](https://pic.leetcode-cn.com/2ad160a3cb5cb5a9e6f305e7e4f373a4bcf9694364502ae18cfa42616fbc50f8-300-greed-binary-search-3.png)![](https://pic.leetcode-cn.com/462331c85f2cff24d7843e4d2d20b6cf053ec5a66090c300d6725bce35adffa0-300-greed-binary-search-4.png)![](https://pic.leetcode-cn.com/65eeee3079908c510ab18a58fc79a759bc990fc5f475ce11a4bd5703718fa297-300-greed-binary-search-5.png)![](https://pic.leetcode-cn.com/542301ec25d4b7c6ff5bfe2247b0c93ef0c8de2d6dcdd8d31de1fd76ca023dc6-300-greed-binary-search-6.png)![](https://pic.leetcode-cn.com/d25ebf30e65f08539631b99877fe3e680dc610174e480d3138316bd4b0fd4bb0-300-greed-binary-search-7.png)![](https://pic.leetcode-cn.com/d879eee3c8d23d24100c78191a11b2400de1c947fbaad664326d03a031406a3a-300-greed-binary-search-8.png)![](https://pic.leetcode-cn.com/7008940585efaf7e11f2b50539f654d38083eda3f4be4af9545f82499520117a-300-greed-binary-search-9.png)![](https://pic.leetcode-cn.com/fa286e2662037237697ee1487b66ebdd60cc4d43dea6c629736e5804d0c47502-300-greed-binary-search-10.png)![](https://pic.leetcode-cn.com/4ea79c933335d3589ea30d0069bc5f0d6370a4e1ccf7340ce36150707ed38d57-300-greed-binary-search-11.png)![](https://pic.leetcode-cn.com/1482b6fd5b6616b13dc2c2d7c58d20e0aedef555102e8d7201e66e6b080185ca-300-greed-binary-search-12.png)![](https://pic.leetcode-cn.com/66ed49450c9973febfa84fed76229bdc236a480f6554741519f9f22cec033539-300-greed-binary-search-13.png)![](https://pic.leetcode-cn.com/df18b7a8889e28ec2c0a11a89385f0814d034bb0d3caf95d242e41683a5f382c-300-greed-binary-search-14.png)![](https://pic.leetcode-cn.com/09cc26acbdc0fe62ec9a79d95d0bb878c0abd8b2af61f7330098ac1b7ddf8e42-300-greed-binary-search-15.png)![](https://pic.leetcode-cn.com/5affa5e17cdbb96e7bdd4659cb8553d64727ee895383629c4d927dd80fc6fefa-300-greed-binary-search-16.png)![](https://pic.leetcode-cn.com/1805c1d89a77358fbaba1419d86c7c489afd857c6afd817d657c0bd1e200aa86-300-greed-binary-search-17.png)![](https://pic.leetcode-cn.com/20b8de5654fff413a00c1d7bd3204a4930731d0b342dbc2ba4cfa41c89f6a6a3-300-greed-binary-search-18.png)![](https://pic.leetcode-cn.com/677a66d92579ced1b67c114c90f1dafb499bd2dd198b93acc440d18e32ede7f1-300-greed-binary-search-19.png)![](https://pic.leetcode-cn.com/39eb82360d5ad5314e1f649a267c821cca8a5b7f1a705d9985596bb423a2487e-300-greed-binary-search-20.png)![](https://pic.leetcode-cn.com/fb069e6f4e36257acf00dbce1bc832002ce68289016b57aa0b2ac0b1f0150a77-300-greed-binary-search-21.png)

1 / 21

说明：关于如何使用二分查找法，请参考「力扣」第 35 题：「插入元素的位置」的 [题解](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/) 。

**参考代码 3**：严格按照以上算法执行流程写出来的代码

Java

Python

C++

    public class Solution {
        public int lengthOfLIS(int[] nums) {
            int len = nums.length;
            if (len <= 1) {
                return len;
            }
    
            // tail 数组的定义：长度为 i + 1 的上升子序列的末尾最小是几
            int[] tail = new int[len];
            // 遍历第 1 个数，直接放在有序数组 tail 的开头
            tail[0] = nums[0];
            // end 表示有序数组 tail 的最后一个已经赋值元素的索引
            int end = 0;
    
            for (int i = 1; i < len; i++) {
                // 【逻辑 1】比 tail 数组实际有效的末尾的那个元素还大
                if (nums[i] > tail[end]) {
                    // 直接添加在那个元素的后面，所以 end 先加 1
                    end++;
                    tail[end] = nums[i];
                } else {
                    // 使用二分查找法，在有序数组 tail 中
                    // 找到第 1 个大于等于 nums[i] 的元素，尝试让那个元素更小
                    int left = 0;
                    int right = end;
                    while (left < right) {
                        // 选左中位数不是偶然，而是有原因的，原因请见 LeetCode 第 35 题题解
                        // int mid = left + (right - left) / 2;
                        int mid = left + ((right - left) >>> 1);
                        if (tail[mid] < nums[i]) {
                            // 中位数肯定不是要找的数，把它写在分支的前面
                            left = mid + 1;
                        } else {
                            right = mid;
                        }
                    }
                    // 走到这里是因为 【逻辑 1】 的反面，因此一定能找到第 1 个大于等于 nums[i] 的元素
                    // 因此，无需再单独判断
                    tail[left] = nums[i];
                }
                // 调试方法
                // printArray(nums[i], tail);
            }
            // 此时 end 是有序数组 tail 最后一个元素的索引
            // 题目要求返回的是长度，因此 +1 后返回
            end++;
            return end;
        }
    
        // 调试方法，以观察是否运行正确
        private void printArray(int num, int[] tail) {
            System.out.print("当前数字：" + num);
            System.out.print("\t当前 tail 数组：");
            int len = tail.length;
            for (int i = 0; i < len; i++) {
                if (tail[i] == 0) {
                    break;
                }
                System.out.print(tail[i] + ", ");
            }
            System.out.println();
        }
    
        public static void main(String[] args) {
            int[] nums = new int[]{3, 5, 6, 2, 5, 4, 19, 5, 6, 7, 12};
            Solution solution = new Solution8();
            int lengthOfLIS = solution8.lengthOfLIS(nums);
            System.out.println("最长上升子序列的长度：" + lengthOfLIS);
        }
    }

**复杂度分析**：

*   时间复杂度：O(NlogN)，遍历数组使用了 O(N)，二分查找法使用了 O(logN)。
*   空间复杂度：O(N)，开辟有序数组 `tail` 的空间至多和原始数组一样。

**参考代码 4**：与「参考代码 3」等价的代码，区别仅在于「二分查找法」候选区间的选择

Java

Python

C++

    public class Solution {
    
        public int lengthOfLIS(int[] nums) {
            int len = nums.length;
            if (len <= 1) {
                return len;
            }
    
            // tail 数组的定义：长度为 i + 1 的上升子序列的末尾最小是几
            int[] tail = new int[len];
            // 遍历第 1 个数，直接放在有序数组 tail 的开头
            tail[0] = nums[0];
    
            // end 表示有序数组 tail 的最后一个已经赋值元素的索引
            int end = 0;
    
            for (int i = 1; i < len; i++) {
                int left = 0;
                // 这里，因为当前遍历的数，有可能比有序数组 tail 数组实际有效的末尾的那个元素还大
                // 【逻辑 1】因此 end + 1 应该落在候选区间里
                int right = end + 1;
                while (left < right) {
                    // 选左中位数不是偶然，而是有原因的，原因请见 LeetCode 第 35 题题解
                    // int mid = left + (right - left) / 2;
                    int mid = (left + right) >>> 1;
    
                    if (tail[mid] < nums[i]) {
                        // 中位数肯定不是要找的数，把它写在分支的前面
                        left = mid + 1;
                    } else {
                        right = mid;
                    }
                }
                // 因为 【逻辑 1】，因此一定能找到第 1 个大于等于 nums[i] 的元素
                // 因此，无需再单独判断，直接更新即可
                tail[left] = nums[i];
    
                // 但是 end 的值，需要更新，当前仅当更新位置在当前 end 的下一位
                if (left == end + 1) {
                    end++;
                }
    
            }
            // 调试方法
            // printArray(nums[i], tail);
            // 此时 end 是有序数组 tail 最后一个元素的索引
            // 题目要求返回的是长度，因此 +1 后返回
            end++;
            return end;
        }
    
        // 调试方法，以观察是否运行正确
        private void printArray(int num, int[] tail) {
            System.out.print("当前数字：" + num);
            System.out.print("\t当前 tail 数组：");
            int len = tail.length;
            for (int i = 0; i < len; i++) {
                if (tail[i] == 0) {
                    break;
                }
                System.out.print(tail[i] + ", ");
            }
            System.out.println();
        }
    
        public static void main(String[] args) {
            int[] nums = new int[]{3, 5, 6, 2, 5, 4, 19, 5, 6, 7, 12};
            Solution solution = new Solution();
            int lengthOfLIS = solution.lengthOfLIS(nums);
            System.out.println("最长上升子序列的长度：" + lengthOfLIS);
        }
    }

**复杂度分析**：（同上）

参考资料
----

*   liuyubobobo 老师在慕课网上开设的课程《玩转算法面试》[代码仓库](/link/?target=https%3A%2F%2Fgithub.com%2Fliuyubobobo%2FPlay-with-Algorithm-Interview%2Fblob%2Fmaster%2F09-Dynamic-Programming%2FCourse%20Code%20\(Java\)%2F08-Longest-Increasing-Subsequence%2Fsrc%2FSolution1.java)
*   O(NlogN) 解法最早是看到一个 YouTube 频道主 Edward 的讲解，具体认识到其实是状态定义的变更来自和加拿大 CS 战友微信群里和群友的讨论。