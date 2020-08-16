package com.example.app.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class PwUtil {

	// SHA-256 암호화 구현

//	public String Encryption(String password) {
//		System.out.println("encryption : " + password);
//		MessageDigest digest = null;
//		byte[] hash = null;
//		StringBuffer hexString = new StringBuffer();
//
//
//		try {
//			System.out.println(1);
//			digest = MessageDigest.getInstance("SHA-256");
//			hash = digest.digest(password.getBytes("UTF-8"));
//
//            for (int i = 0; i < hash.length; i++) {
//                String hex = Integer.toHexString(0xff & hash[i]);
//                if(hex.length() == 1) hexString.append('0');
//                hexString.append(hex);
//            }
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		System.out.println(hexString);
//
//		return hexString.toString();
//	}

	// Properties에 있는 값과 SHA-256 암호화시킨 입력값을 비교해서 boolean값 반환

	/**
	 * SHA-256으로 해싱하는 메소드
	 *

	 */
	public static String Encryption(String msg) throws NoSuchAlgorithmException {
		MessageDigest md = MessageDigest.getInstance("SHA-256");
		md.update(msg.getBytes());

		return bytesToHex(md.digest());
	}


	/**
	 * 바이트를 헥스값으로 변환한다
	 *
	 * @param bytes
	 * @return
	 */
	public static String bytesToHex(byte[] bytes) {
		StringBuilder builder = new StringBuilder();
		for (byte b: bytes) {
			builder.append(String.format("%02x", b));
		}
		return builder.toString();
	}
//
//
//	public boolean PWCheck(String inputPwd,String pwd) throws NoSuchAlgorithmException {
//		System.out.println("ㅎ2");
//
//	}


}
