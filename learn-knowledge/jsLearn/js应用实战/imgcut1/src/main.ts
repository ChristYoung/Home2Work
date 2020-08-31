// 导入css文件
import './styles/imgcut.css';

// 引入jquery
import $ from 'jquery';

// 1. 获取文件并读取文件
import { fileInputChange, makeImgMoveable } from './fileInputChange';

fileInputChange();

import { ResizeAbleImage } from './resizeableImage';
const re = new ResizeAbleImage($('.resize-image'));