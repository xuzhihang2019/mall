<template>
  <div class="wrapper">分类
    <ul class="content">
      <li>1111111</li>
      <li>1111112</li>
      <li>1111113</li>
      <li>1111114</li>
      <li>1111115</li>
      <li>1111116</li>
      <li>1111117</li>
      <li>1111118</li>
      <li>1111119</li>
      <li>11111110</li>
      <li>11111111</li>
      <li>11111112</li>
      <li>11111113</li>
      <li>11111114</li>
      <li>11111115</li>
      <li>11111116</li>
      <li>11111117</li>
      <li>11111118</li>
      <li>11111119</li>
      <li>11111120</li>
      <li>11111121</li>
      <li>11111122</li>
      <li>11111123</li>
      <li>11111124</li>
      <li>11111125</li>
      <li>11111126</li>
      <li>11111127</li>
      <li>11111128</li>
      <li>11111129</li>
      <li>11111130</li>
      <li>11111131</li>
      <li>11111132</li>
      <li>11111133</li>
      <li>11111134</li>
      <li>11111135</li>
      <li>11111136</li>
      <li>11111137</li>
      <li>11111138</li>
      <li>11111139</li>
      <li>11111140</li>
      <li>11111141</li>
      <li>11111142</li>
      <li>11111143</li>
      <li>11111144</li>
      <li>11111145</li>
      <li>11111146</li>
      <li>11111147</li>
      <li>11111148</li>
      <li>11111149</li>
      <li>11111150</li>
      <li>11111151</li>
      <li>11111152</li>
      <li>11111153</li>
      <li>11111154</li>
      <li>11111155</li>
      <li>11111156</li>
      <li>11111157</li>
      <li>11111158</li>
      <li>11111159</li>
      <li>11111160</li>
      <li>11111161</li>
      <li>11111162</li>
      <li>11111163</li>
      <li>11111164</li>
      <li>11111165</li>
      <li>11111166</li>
      <li>11111167</li>
      <li>11111168</li>
      <li>11111169</li>
      <li>11111170</li>
      <li>11111171</li>
      <li>11111172</li>
      <li>11111173</li>
      <li>11111174</li>
      <li>11111175</li>
      <li>11111176</li>
      <li>11111177</li>
      <li>11111178</li>
      <li>11111179</li>
      <li>11111180</li>
      <li>11111181</li>
      <li>11111182</li>
      <li>11111183</li>
      <li>11111184</li>
      <li>11111185</li>
      <li>11111186</li>
      <li>11111187</li>
      <li>11111188</li>
      <li>11111189</li>
      <li>11111190</li>
      <li>11111191</li>
      <li>11111192</li>
      <li>11111193</li>
      <li>11111194</li>
      <li>11111195</li>
      <li>11111196</li>
      <li>11111197</li>
      <li>11111198</li>
      <li>11111199</li>
      <li>111111100</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll('.wrapper',{
        probeType: 3,
        pullUpLoad: true,
        click: true
      })

      this.scroll.on('scroll', (position) => {
        // console.log(position)
      })

      this.scroll.on('pullingUp', function () {
        console.log('上拉加载')
      })
    }
  }
</script>
<style scoped>
  .wrapper {
    height: 150px;
    background-color: blue;
  }
</style>
