---
lang: zh-CN
title: 关于
description: 关于
---

## 说明


不知道说什么，随便写点什么吧！


## 关注我



<VPTeamMembers size="small" :members="members" />

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
   {
    avatar: 'https://avatars.githubusercontent.com/u/65836396?v=4',
    name: 'wuxin0011',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/wuxin0011' },
      
    ]
  }
 
   
]
</script>
