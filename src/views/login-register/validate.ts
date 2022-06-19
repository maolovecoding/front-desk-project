/**
 * 表单校验
 */
export const validateUsername = (value: string) => {
  if (!value) return "用户名是必填项";
  if (value.length < 3 || value.length > 12) return "用户名应该在 3-12 位之间";
  console.log(value);
  // 返回true表示校验通过
  return true;
};
export const validatePassword = (value: string) => {
  if (!value) return "密码是必填项";
  if (value.length < 3 || value.length > 12) return "密码应该在 3-12 位之间";
  console.log(value);
  // 返回true表示校验通过
  return true;
};

/**
 * 确认密码表单校验  关联密码需要注册
 * 1. 定义方法
 * 2. 注册这个校验
 */
export const validateConfirmPassword = (val: string, password: string[]) => {
  if(val!==password[0]) return "两次密码输入不一致"
  console.log(val, password);
  return true;
};
