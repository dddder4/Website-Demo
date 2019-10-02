<template>
    <div>
        <div>
            <p>三、代码实现</p>
            <p>导包</p>
            <img src="./ln1.png" width="100%"/>
            <p>载入数据&标准化</p>
            <img src="./ln2.png" width="100%"/>
            <p>建模&训练</p>
            <img src="./ln3.png" width="100%"/>
            <p>稍等一会可以看到MLPClassifier的参数设定</p>
            <img src="./out3.png" width="100%"/>
            <p>评估</p>
            <img src="./ln4.png" width="100%"/>
            <p>稍等一会可以看到评估的结果</p>
            <img src="./out4.png" width="100%"/>
            <p>查看混淆矩阵</p>
            <img src="./ln5.png" width="100%"/>
            <div class="footer">
            <div style="float:left;"><input type="button" onclick="gobackward()" id="back" value="上一个" style="display:none;" /></div>
            <div style="float:right;"><input type="button" onclick="goforward()" id="front" value="下一个" /></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: '手写图像识别'
}
</script>
