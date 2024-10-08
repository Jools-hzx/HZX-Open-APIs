package com.jools.project.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.jools.joolscommon.model.entity.InterfacesInfo;
import com.jools.project.model.vo.InterfacesInfoVO;
import org.springframework.beans.BeanUtils;

/**
 * @author 10355
 * @description 针对表【interfaces_info(接口信息表)】的数据库操作Service
 * @createDate 2024-08-07 22:46:43
 */
public interface InterfacesInfoService extends IService<InterfacesInfo> {

    /**
     * 校验更新请求
     *
     * @param interfacesInfo
     * @param add            TRUE 表示启用，否则表示禁用
     */
    void validInterfacesInfo(InterfacesInfo interfacesInfo, boolean add);

    /*
    出于可维护性和可读性，后期可以考虑
    1. 使用构造函数或者静态工厂方法，将该转换逻辑移动到 InterfacesInfoVO 中; 使用构造函数的静态方法
    2. 使用 BeanUtils 进行拷贝
    3. 使用 Lombok 的 @Builder 注解
     */
    default InterfacesInfoVO convert2Vo(InterfacesInfo interfacesInfo) {
        InterfacesInfoVO vo = new InterfacesInfoVO();
        BeanUtils.copyProperties(interfacesInfo, vo);
        return vo;
    }
}
