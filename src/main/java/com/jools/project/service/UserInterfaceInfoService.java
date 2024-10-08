package com.jools.project.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.jools.joolscommon.model.entity.UserInterfaceInfo;
import com.jools.project.model.vo.UserInterfaceInfoVO;

import java.util.List;

/**
* @author 10355
* @description 针对表【user_interface_info(用户调用接口关系)】的数据库操作Service
* @createDate 2024-08-30 20:23:33
*/
public interface UserInterfaceInfoService extends IService<UserInterfaceInfo> {

    List<UserInterfaceInfo> listInterfacesAnalysis(Integer limit);

    void validUserInterfaceInfo(UserInterfaceInfo userInterfaceInfo, Boolean flag);

    boolean invokeInterfaceCount(Long interfaceInfoId, Long userId);

    boolean canInvoke(Long interfaceInfoId, Long userId);

    UserInterfaceInfoVO convert2VO(UserInterfaceInfo userInterfaceInfo);
}
