package com.allFood.backend.config.shiro;

import com.allFood.backend.config.shiro.security.JwtToken;
import com.allFood.backend.config.shiro.security.JwtUtil;
import com.allFood.backend.config.shiro.security.SecurityConst;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MyRealm extends AuthorizingRealm {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }


    //has to rewrite this method or there will be error
    @Override
    public boolean supports(AuthenticationToken token) {
        return token instanceof JwtToken;
    }

    //authenticating the user name, throw error when there is exception
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        String token = (String) authenticationToken.getPrincipal();
        String account = JwtUtil.getClaim(token, SecurityConst.ACCOUNT);
        String password = userService.getPassword(account);

        //check whether the account exists
        if (account == null) {
            LOGGER.error("authentication error...");
            throw new AuthenticationException("no account exists");
        }

        //verify the token
        if (JwtUtil.verify(token, password)) {
            return new SimpleAuthenticationInfo(token, token, "my_realm");
        }

        throw new AuthenticationException("Incorrect information in the token or expired");
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();

        String account = JwtUtil.getClaim(principalCollection.toString(), SecurityConst.ACCOUNT);
        SysUser user = userService.findUserByName(account);

        //get the role the user got in the system
        List<SysRole> roles = user.getRoles();
        for (SysRole role : roles) {
            authorizationInfo.addRole(role.getRoleName());
        }

        //get all the permissions the user got
        Set<String> permissions = new HashSet<>();
        for (SysRole role : roles) {

            for (SysPermission permission : role.getPermissions()) {
                permissions.add(permission.getPermType());
            }
        }
        authorizationInfo.addStringPermissions(permissions);

        return authorizationInfo;
    }
}
