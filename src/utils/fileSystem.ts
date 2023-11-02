import * as fs from 'fs';
import * as path from 'path'

type FileExitsAction = "Ignore" | "Error"

export default class fileSystem {
  /**
  * 파일 또는 디렉터리의 존재 여부를 확인하는 함수
  * @param {string} path - 파일 또는 디렉터리의 경로
  * @returns {boolean} - 파일 또는 디렉터리가 존재하면 true, 그렇지 않으면 false를 반환
  */
  public fileExists(filePath: string): boolean {
    try {
      fs.accessSync(path.join(process.cwd() + filePath), fs.constants.F_OK);
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * 
   * @param {string} path - 생성할 디렉터리의 경로
   * @param {string} name - 디렉터리의 이름
   * @returns {boolean} - 생성이 완료 되면 true, 아니라면 false
   */
  public mkdir(filePath: string, name: string, exits: FileExitsAction): boolean {
    try {
      switch (exits) {
        case "Ignore":
          if (!this.fileExists(path.join(process.cwd() + filePath))) fs.mkdirSync(path.join(process.cwd() + filePath + name));
          break;
        case "Error":
          if (!this.fileExists(path.join(process.cwd() + filePath))) fs.mkdirSync(path.join(process.cwd() + filePath + name));
          else throw new Error("폴더 이미 있음")
      }

      return true
    } catch (err) {
      return false
    }
  }
}