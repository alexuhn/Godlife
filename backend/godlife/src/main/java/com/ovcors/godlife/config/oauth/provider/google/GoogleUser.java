package com.ovcors.godlife.config.oauth.provider.google;

import com.ovcors.godlife.config.oauth.provider.google.GoogleOAuthUserInfo;

import java.util.Map;

public class GoogleUser implements GoogleOAuthUserInfo {

    private Map<String, Object> attribute;

    public GoogleUser(Map<String, Object> attribute) {
        this.attribute = attribute;
    }

    @Override
    public String getProviderId() {
        return (String) attribute.get("googleId");
    }

    @Override
    public String getProvider() {
        return "google";
    }

    @Override
    public String getEmail() {
        return (String) attribute.get("email");
    }

    @Override
    public String getName() {
        return (String) attribute.get("name");
    }

    @Override
    public String getImage() {
        return (String) attribute.get("imageUrl");
    }


}
