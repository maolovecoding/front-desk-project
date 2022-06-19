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
