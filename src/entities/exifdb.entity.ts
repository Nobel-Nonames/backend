import { Schema } from "mongoose";
import Mongo from "../utils/mongoose";

const SchemaDefinition = {
  serial_filename: {
    type: String,
    index: true,
    unique: true
  },
  cameraInfo: {
    type: Schema.Types.ObjectId,
    ref: 'cameraInfo',
    required: true
  },
  name: {
    type: String,
  },
  mainflag: {
    type: Boolean,
    default: false
  },
  bestprob: {
    type: Number,
    default: 0
  },
  serial: {  //트랩카메라 시리얼 번호
    type: String,
    required: true
  },
  classname: {  // 딥러닝 분석 결과(동물명)
    type: String,
    default: 'Unknown'
  },
  classcount: {  // 이미지내 동물 수
    type: Number,
    default: 0
  },
  evtdate: {  //이벤트 날짜
    type: Date,
  },
  evtnum: {  //이벤트 번호
    type: Number,
  },
  result_path: {  // 결과 이미지 저장 경로
    type: String,
  },
  source_path: {  //원본 이미지 저장 경로
    type: String,
  },
  thumnail_path: {
    type: String,
  },
  filename: {  //시간+ 시퀀스 번호 기반 고유 파일 이름
    type: String,
    required: true
  },
  dpmeta: {  // 딥러닝 분석결과 세부 저장
    type: Object,
    default: null
  },
  modifyflag: {   //데이터 변경 기록 플래그
    type: Boolean,
    default: false
  },
  searchflag: {
    type: Boolean,
    default: false
  },
  updateflag: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: new Date()
  },
  date: {
    type: Date,
  },
  // new
  model: {
    type: String
  },
}

const exifModel = new Mongo().releaseModel('exif', SchemaDefinition)

export default exifModel