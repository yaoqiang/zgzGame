/****************************************************************************
 * Copyright (c) 2015 Chukong Technologies Inc.
 * <p>
 * http://www.cocos2d-x.org
 * <p>
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * <p>
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * <p>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 ****************************************************************************/
package org.cocos2dx.javascript;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.provider.MediaStore;
import android.util.Log;
import android.view.Gravity;
import android.view.View;

import com.erun.zgz.R;
import com.pingplusplus.android.PaymentActivity;
import com.pingplusplus.android.PingppLog;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;
import org.json.JSONObject;

import java.io.File;
import java.util.Date;


public class AppActivity extends Cocos2dxActivity {

    private static final int REQUEST_CODE_PAYMENT = 1;
    private static final int REQUEST_CODE_PICK = 2;        // 选取照片
    private static final int REQUEST_CODE_TAKE = 3;        // 拍照
    private static final int REQUEST_CODE_CUTTING = 4;    // 裁剪


    private static AppActivity currentActivity = null;

    private Context context;
    private SelectPicPopupWindow menuWindow;
    private static ProgressDialog pd;
    private String lastAvatarUrl = "";

    ClipboardManager clipboardManager = null;


    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);

        //payment
        PingppLog.DEBUG = true;

        //
        currentActivity = this;
        context = this.getApplicationContext();

        clipboardManager = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);

        return glSurfaceView;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {

        switch (requestCode) {
            case REQUEST_CODE_PAYMENT:
                if (resultCode == Activity.RESULT_OK) {
                    int optType = data.getExtras().getInt("OPT_TYPE");
                    if (optType == 1) {
                        final String result = data.getExtras().getString("pay_result");
                    /* 处理返回值
                     * "success" - payment succeed
                     * "fail"    - payment failed
                     * "cancel"  - user canceld
                     * "invalid" - payment plugin not installed
                     */
                        String errorMsg = data.getExtras().getString("error_msg"); // 错误信息
                        String extraMsg = data.getExtras().getString("extra_msg"); // 错误信息
                        if (!result.equals("success")) {
                            this.runOnGLThread(new Runnable() {
                                @Override
                                public void run() {
                                    Cocos2dxJavascriptJavaBridge.evalString("cppCallback_processPaidFailed" + "(\"" + result + "\");");
                                }
                            });

                        }
                    }
                }
                break;

        }
        //支付页面返回处理

        super.onActivityResult(requestCode, resultCode, data);

    }




    public static Object getCurrentActivity() {
        return currentActivity;
    }

    /**
     * pingpp支付请求
     *
     * @param data
     */
    public void doPayment(String data) {
        Intent intent = new Intent(AppActivity.this, PaymentActivity.class);
        intent.putExtra(PaymentActivity.EXTRA_CHARGE, data);
        startActivityForResult(intent, REQUEST_CODE_PAYMENT);
    }

    /**
     * 打开浏览器并跳转到指定网站更新app
     *
     * @param url
     */
    public void openBrowser(String url) {
        Uri uri = Uri.parse(url);

        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        startActivity(intent);

    }

    /**
     * 复制内容到剪贴板
     *
     * @param value
     * @return
     */
    public void copyStringToClipboard(String value) {
        clipboardManager.setPrimaryClip(ClipData.newPlainText(null, value));
    }


}
