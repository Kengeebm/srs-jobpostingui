package com.paraamarsh.gateway.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    public static final String RECRUITERMANAGER = "ROLE_RECRUITERMANAGER";

    public static final String RECRUITER = "ROLE_RECRUITER";

    public static final String APPADMIN = "ROLE_APPADMIN";

    public static final String SUPERADMIN = "ROLE_SUPERADMIN";

    // FOR BANGALORE SERVER external api
    public static final String EDMS_URL = "http://103.88.157.45:8084";

    public static final String RESUME_REPO_URL = "http://103.88.157.45:8083";
    
       // FOR BANGALORE SERVER internal api
    public static final String EDMS_URL_2 = "http://192.168.1.47:8084";

    public static final String RESUME_REPO_URL_2 = "http://192.168.1.47:8083";

    // FOR HYRABAD SERVER
/*    public static final String EDMS_URL = "ROLE_SUPERADMIN";

    public static final String RESUME_REPO_URL = "ROLE_SUPERADMIN";*/

    private AuthoritiesConstants() {
    }
}
