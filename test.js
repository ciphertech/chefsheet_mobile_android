var scrollAlbums = Ti.UI.createScrollView({
        bottom: 10,
        height: 95,
        contentWidth: 'auto',
        layout: 'horizontal'
    });
 
function loadAlbums(){
        //scrollAlbums.children = [];
 
        require('BusinessLogic/loadAlbums').loadAlbums(
            function update(albums){
 
                var fonds = [];     ///////////////////////////////////////////////////////
 
                if(firstChargement){
                    loadPhotos(albums[0].photos, albums[0].titre);
                    firstChargement = false;
                }
 
                var albumGaucheView = Ti.UI.createView({
                    backgroundImage: Ti.Filesystem.resourcesDirectory + 'images/01-Albumleft.png',
                    width: 8, height: 95, left: 10
                });
 
                scrollAlbums.add(albumGaucheView);
 
                for(var i=0;i<albums.length;i++){
 
                    var fond = Ti.UI.createView({
                        backgroundImage: Ti.Filesystem.resourcesDirectory + 'images/01-Albumbody-Off.png',
                        width: 73,
                        height: 95
                    });
 
                    fonds.push(fond);
 
                    var conteneurAlbum = Ti.UI.createView({
                        layout: 'vertical',
                        left: 4,
                        top: 10
                    });
 
                    var textAlbum = Ti.UI.createLabel({
                        text: albums[i].titre,
                        color: '#000',
                        font: {fontSize: 11},
                        width: 55,
                        height: 16,
                        top: 2,
                        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
                    });
 
                    var imageAlbumView = Ti.UI.createImageView({
                        image : albums[i].thumb,
                        width : 50,
                        height : 50,
                        photos : albums[i].photos,
                        titre: albums[i].titre,
                        index: i
                    });
 
                    imageAlbumView.addEventListener('click', function(e){
                        for(var a=0; a<fonds.length; a++)
                            fonds[a].backgroundImage = Ti.Filesystem.resourcesDirectory + 'images/01-Albumbody-Off.png'
                        fonds[e.source.index].backgroundImage = Ti.Filesystem.resourcesDirectory + 'images/01-Albumbody-On.png';    
                        loadPhotos(e.source.photos, e.source.titre);
                    });
 
                    conteneurAlbum.add(imageAlbumView);
                    conteneurAlbum.add(textAlbum);
                    fond.add(conteneurAlbum);
                    scrollAlbums.add(fond);
                }
 
                var albumDroiteView = Ti.UI.createView({
                    backgroundImage: Ti.Filesystem.resourcesDirectory + 'images/01-Albumright.png',
                    width: 8, height: 95
                });
 
                scrollAlbums.add(albumDroiteView);
            },
 
            function error(msg){
                //alert(msg);
            }
        );
    }