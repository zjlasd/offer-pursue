function addLargeNumbers(num1, num2) {
    // 将两个数字转为字符串数组，反转后逐位相加
    let arr1 = num1.split('').reverse();
    let arr2 = num2.split('').reverse();

    let carry = 0;
    let result = [];

    const maxLength = Math.max(arr1.length, arr2.length);

    for (let i = 0; i < maxLength; i++) {
        let digit1 = parseInt(arr1[i] || '0');
        let digit2 = parseInt(arr2[i] || '0');

        let sum = digit1 + digit2 + carry;
        carry = Math.floor(sum / 10);
        result.push(sum % 10);
    }

    if (carry) result.push(carry);

    return result.reverse().join('');
}

console.log(addLargeNumbers('123456789012345678901234567890', '987654321098765432109876543210'));
