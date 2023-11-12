import { ZhCNText } from "./zh-cn.ts";
import { Code } from "./constants.ts";

interface Failure {
  code: number; //   `json:"code"`    // 业务码
  msg: string; // `json:"message"` // 描述信息
}

// Success 成功时返回结构
interface Success<T = unknown> {
  code: number; //         `json:"code"`    // 业务码
  msg: string; //      `json:"message"` // 描述信息
  data: T; //  `json:"data"`    //业务返回数据
}

export class CodeResponse {
  code(key: keyof typeof Code) {
    return Code[key];
  }
  // TODO: 依赖语言配置
  text(key: keyof typeof Code) {
    return ZhCNText[key];
  }
  business<T>(key: keyof typeof Code, data?: T): Failure | Success<T> {
    return {
      code: this.code(key),
      msg: this.text(key),
      data,
    };
  }

  static responseJson<T>(key: keyof typeof Code, data?: T, opt?: ResponseInit) {
    const ins = new CodeResponse();
    const code = ins.code(key);
    const msg = ins.text(key);
    const body = {
      code,
      msg,
      data,
    };

    return new Response(JSON.stringify(body), {
      status: 200,
      ...opt,
      headers: {
        ...opt?.headers,
        "Content-Type": "application/json",
      },
    });
  }
}
