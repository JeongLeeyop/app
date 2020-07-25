package com.example.app.util;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

public class HotItemManager {
    private static HotItemManager instance = new HotItemManager();

    private List<HotItem> hotList = new ArrayList<>();

    // 생성자
    private HotItemManager () {
        System.out.println( "call HotItemManager constructor." );
    }
    // 조회 method
    public static HotItemManager getInstance () {
        return instance;
    }

    public void setHotList (List<HotItem> list) {
        this.hotList = list;
    }

    public List<HotItem> getHotList() {
        return this.hotList;
    }
}

@Setter
@Getter
class HotItem {
    private long boookIdx;
    private int totalCount;
    private int dailyCount;
}
